// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

import {DomainObjs} from 'maci-contracts/contracts/utilities/DomainObjs.sol';
import {MACI} from 'maci-contracts/contracts/MACI.sol';
import {Poll} from 'maci-contracts/contracts/Poll.sol';
import {Tally} from 'maci-contracts/contracts/Tally.sol';
import {SignUpGatekeeper} from 'maci-contracts/contracts/gatekeepers/SignUpGatekeeper.sol';
import {InitialVoiceCreditProxy} from 'maci-contracts/contracts/initialVoiceCreditProxy/InitialVoiceCreditProxy.sol';
import {CommonUtilities} from 'maci-contracts/contracts/utilities/CommonUtilities.sol';
import {SnarkCommon} from 'maci-contracts/contracts/crypto/SnarkCommon.sol';
import {ITallySubsidyFactory} from 'maci-contracts/contracts/interfaces/ITallySubsidyFactory.sol';
import {IMessageProcessorFactory} from 'maci-contracts/contracts/interfaces/IMPFactory.sol';
import {IClrFund} from './interfaces/IClrFund.sol';
import {IMACIFactory} from './interfaces/IMACIFactory.sol';
import {MACICommon} from './MACICommon.sol';
import {TopupToken} from './TopupToken.sol';

import './userRegistry/IUserRegistry.sol';
import './recipientRegistry/IRecipientRegistry.sol';

contract FundingRound is
  Ownable,
  SignUpGatekeeper,
  InitialVoiceCreditProxy,
  DomainObjs,
  SnarkCommon,
  CommonUtilities,
  MACICommon
{
  using SafeERC20 for ERC20;

  // Errors
  error OnlyMaciCanRegisterVoters();
  error NotCoordinator();
  error InvalidPoll();
  error InvalidTally();
  error InvalidMessageProcessor();
  error MaciAlreadySet();
  error ContributionAmountIsZero();
  error ContributionAmountTooLarge();
  error AlreadyContributed();
  error UserNotVerified();
  error UserHasNotContributed();
  error UserAlreadyRegistered();
  error NoVoiceCredits();
  error NothingToWithdraw();
  error RoundNotCancelled();
  error RoundCancelled();
  error RoundAlreadyFinalized();
  error RoundNotFinalized();
  error VotesNotTallied();
  error EmptyTallyHash();
  error InvalidBudget();
  error NoProjectHasMoreThanOneVote();
  error VoteResultsAlreadyVerified();
  error IncorrectTallyResult();
  error IncorrectSpentVoiceCredits();
  error IncorrectPerVOSpentVoiceCredits();
  error FundsAlreadyClaimed();
  error TallyHashNotPublished();
  error IncompleteTallyResults(uint256 total, uint256 actual);
  error NoVotes();
  error MaciNotSet();
  error PollNotSet();
  error InvalidMaci();
  error InvalidNativeToken();
  error InvalidUserRegistry();
  error InvalidRecipientRegistry();
  error InvalidCoordinator();
  error UnexpectedPollAddress(address expected, address actual);


  // Constants
  uint256 private constant MAX_VOICE_CREDITS = 10 ** 9;  // MACI allows 2 ** 32 voice credits max
  uint256 private constant MAX_CONTRIBUTION_AMOUNT = 10 ** 4;  // In tokens
  uint256 private constant ALPHA_PRECISION = 10 ** 18; // to account for loss of precision in division

    /// @notice The maximum voice credits per allocator
    uint256 public maxVoiceCreditsPerAllocator;

  // Structs
  struct ContributorStatus {
    uint256 voiceCredits;
    bool isRegistered;
  }

  struct RecipientStatus {
    // Has the recipient claimed funds?
    bool fundsClaimed;
    // Is the tally result verified
    bool tallyVerified;
    // Tally result
    uint256 tallyResult;
  }

  // State
  uint256 public voiceCreditFactor;
  uint256 public contributorCount;
  uint256 public matchingPoolSize;
  uint256 public totalSpent;
  uint256 public totalVotes;
  bool public isFinalized = false;
  bool public isCancelled = false;

  uint256 public pollId;
  Poll public poll;
  Tally public tally;

  address public coordinator;
  MACI public maci;
  ERC20 public nativeToken;
  IUserRegistry public userRegistry;
  IRecipientRegistry public recipientRegistry;
  TopupToken public topupToken;

  string public tallyHash;

  // The alpha used in quadratic funding formula
  uint256 public alpha = 0;

  // Total number of tally results verified, should match total recipients before finalize
  uint256 public totalTallyResults = 0;
  uint256 public totalVotesSquares = 0;
  mapping(uint256 => RecipientStatus) public _recipients;
  mapping(address => ContributorStatus) public _contributors;

  // Events
  event Contribution(address indexed _sender, uint256 _amount);
  event ContributionWithdrawn(address indexed _contributor);
  event FundsClaimed(uint256 indexed _voteOptionIndex, address indexed _recipient, uint256 _amount);
  event TallyPublished(string _tallyHash);
  event Voted(address indexed _contributor);
  event TallyResultsAdded(uint256 indexed _voteOptionIndex, uint256 _tally);
  event PollSet(address indexed _poll);
  event TallySet(address indexed _tally);

  modifier onlyCoordinator() {
    if(msg.sender != coordinator) {
      revert NotCoordinator();
    }
    _;
  }


  /**
   * @dev Is the given address a zero address
   */
  function isAddressZero(address addressValue) public pure returns (bool) {
    return (addressValue == address(0));
  }

  /**
   * @dev Have the votes been tallied
   */
  function isTallied() private view returns (bool) {
    (uint256 numSignUps, ) = poll.numSignUpsAndMessages();
    (uint8 intStateTreeDepth, , , ) = poll.treeDepths();
    uint256 tallyBatchSize = TREE_ARITY ** uint256(intStateTreeDepth);
    uint256 tallyBatchNum = tally.tallyBatchNum();
    uint256 totalTallied = tallyBatchNum * tallyBatchSize;

    return numSignUps > 0 && totalTallied >= numSignUps;
  }

  /**
  * @dev Set the tally contract
  * @param _tally The tally contract address
  */
  function _setTally(address _tally) private
  {
    if (isAddressZero(_tally)) {
      revert InvalidTally();
    }

    tally = Tally(_tally);
    emit TallySet(address(tally));
  }

  /**
    * @dev Reset tally results. This should only be used if the tally script
    * failed to proveOnChain due to unexpected error processing MACI logs
    */
  function resetTally()
    external
    onlyCoordinator
  {
    if (isAddressZero(address(maci))) revert MaciNotSet();

    _votingPeriodOver(poll);
    if (isFinalized) {
      revert RoundAlreadyFinalized();
    }

    address verifier = address(tally.verifier());
    address vkRegistry = address(tally.vkRegistry());

    IMessageProcessorFactory messageProcessorFactory = maci.messageProcessorFactory();
    ITallySubsidyFactory tallyFactory = maci.tallyFactory();

    address mp = messageProcessorFactory.deploy(verifier, vkRegistry, address(poll), coordinator);
    address newTally = tallyFactory.deploy(verifier, vkRegistry, address(poll), mp, coordinator);
    _setTally(newTally);
  }

  /**
    * @dev Link MACI related contracts to this funding round.
    */
  function setMaci(
    MACI _maci,
    MACI.PollContracts memory _pollContracts
  )
    external
    onlyOwner
  {
    if (!isAddressZero(address(maci))) revert MaciAlreadySet();

    if (isAddressZero(address(_maci))) revert InvalidMaci();
    if (isAddressZero(_pollContracts.poll)) revert InvalidPoll();
    if (isAddressZero(_pollContracts.messageProcessor)) revert InvalidMessageProcessor();

    // we only create 1 poll per maci, make sure MACI use pollId = 0
    // as the first poll index
    pollId = 0;

    address expectedPoll = _maci.getPoll(pollId);
    if( _pollContracts.poll != expectedPoll ) {
      revert UnexpectedPollAddress(expectedPoll, _pollContracts.poll);
    }

    maci = _maci;
    poll = Poll(_pollContracts.poll);
    _setTally(_pollContracts.tally);
  }


 


  /**
    * @dev Publish the IPFS hash of the vote tally. Only coordinator can publish.
    * @param _tallyHash IPFS hash of the vote tally.
    */
  function publishTallyHash(string calldata _tallyHash)
    external
    onlyCoordinator
  {
    if (isFinalized) {
      revert RoundAlreadyFinalized();
    }
    if (bytes(_tallyHash).length == 0) {
      revert EmptyTallyHash();
    }

    tallyHash = _tallyHash;
    emit TallyPublished(_tallyHash);
  }

  /**
    * @dev Calculate the alpha for the capital constrained quadratic formula
    *  in page 17 of https://arxiv.org/pdf/1809.06421.pdf
    * @param _budget Total budget of the round to be distributed
    * @param _totalVotesSquares Total of the squares of votes
    * @param _totalSpent Total amount of spent voice credits
   */
  function calcAlpha(
    uint256 _budget,
    uint256 _totalVotesSquares,
    uint256 _totalSpent
  )
    public
    view
    returns (uint256 _alpha)
  {
    // make sure budget = contributions + matching pool
    uint256 contributions = _totalSpent * voiceCreditFactor;

    if (_budget < contributions) {
      revert InvalidBudget();
    }

    // guard against division by zero.
    // This happens when no project receives more than one vote
    if (_totalVotesSquares <= _totalSpent) {
      revert NoProjectHasMoreThanOneVote();
    }

    return  (_budget - contributions) * ALPHA_PRECISION /
            (voiceCreditFactor * (_totalVotesSquares - _totalSpent));

  }

  /**
    * @dev Get the total amount of votes from MACI,
    * verify the total amount of spent voice credits across all recipients,
    * calculate the quadratic alpha value,
    * and allow recipients to claim funds.
    * @param _totalSpent Total amount of spent voice credits.
    * @param _totalSpentSalt The salt.
    */
  function finalize(
    uint256 _totalSpent,
    uint256 _totalSpentSalt,
    uint256 _newResultCommitment,
    uint256 _perVOSpentVoiceCreditsHash
  )
    external
    onlyOwner
  {
    if (isFinalized) {
      revert RoundAlreadyFinalized();
    }

    if (isAddressZero(address(maci))) revert MaciNotSet();

    _votingPeriodOver(poll);

    if (!isTallied()) {
      revert VotesNotTallied();
    }
    if (bytes(tallyHash).length == 0) {
      revert TallyHashNotPublished();
    }

    // make sure we have received all the tally results
    (,,, uint8 voteOptionTreeDepth) = poll.treeDepths();
    uint256 totalResults = uint256(TREE_ARITY) ** uint256(voteOptionTreeDepth);
    if ( totalTallyResults != totalResults ) {
      revert IncompleteTallyResults(totalResults, totalTallyResults);
    }

    // If nobody voted, the round should be cancelled to avoid locking of matching funds
    if ( _totalSpent == 0) {
      revert NoVotes();
    }

    bool verified = tally.verifySpentVoiceCredits(_totalSpent, _totalSpentSalt, _newResultCommitment, _perVOSpentVoiceCreditsHash);
    if (!verified) {
      revert IncorrectSpentVoiceCredits();
    }


    totalSpent = _totalSpent;
    // Total amount of spent voice credits is the size of the pool of direct rewards.
    // Everything else, including unspent voice credits and downscaling error,
    // is considered a part of the matching pool
    uint256 budget = nativeToken.balanceOf(address(this));
    matchingPoolSize = budget - totalSpent * voiceCreditFactor;

    alpha = calcAlpha(budget, totalVotesSquares, totalSpent);

    isFinalized = true;
  }

  /**
    * @dev Cancel funding round.
    */
  function cancel()
    external
    onlyOwner
  {
    if (isFinalized) {
      revert RoundAlreadyFinalized();
    }
    isFinalized = true;
    isCancelled = true;
  }

  /**
    * @dev Get allocated token amount (without verification).
    * @param _tallyResult The result of vote tally for the recipient.
    * @param _spent The amount of voice credits spent on the recipient.
    */
  function getAllocatedAmount(
    uint256 _tallyResult,
    uint256 _spent
  )
    public
    view
    returns (uint256)
  {
    // amount = ( alpha * (quadratic votes)^2 + (precision - alpha) * totalSpent ) / precision
    uint256 quadratic = alpha * voiceCreditFactor * _tallyResult * _tallyResult;
    uint256 totalSpentCredits = voiceCreditFactor * _spent;
    uint256 linearPrecision = ALPHA_PRECISION * totalSpentCredits;
    uint256 linearAlpha = alpha * totalSpentCredits;
    return ((quadratic + linearPrecision) - linearAlpha) / ALPHA_PRECISION;
  }

  /**
    * @dev Claim allocated tokens.
    * @param _voteOptionIndex Vote option index.
    * @param _spent The amount of voice credits spent on the recipients.
    * @param _spentProof Proof of correctness for the amount of spent credits.
    */
  function claimFunds(
    uint256 _voteOptionIndex,
    uint256 _spent,
    uint256[][] calldata _spentProof,
    uint256 _spentSalt,
    uint256 _resultsCommitment,
    uint256 _spentVoiceCreditsCommitment
  )
    external
  {
    if (!isFinalized) {
      revert RoundNotFinalized();
    }

    if (isCancelled) {
      revert RoundCancelled();
    }

    if (_recipients[_voteOptionIndex].fundsClaimed) {
      revert FundsAlreadyClaimed();
    }
    _recipients[_voteOptionIndex].fundsClaimed = true;

    {
      // create scope to avoid 'stack too deep' error

      (, , , uint8 voteOptionTreeDepth) = poll.treeDepths();
      bool verified = tally.verifyPerVOSpentVoiceCredits(
        _voteOptionIndex,
        _spent,
        _spentProof,
        _spentSalt,
        voteOptionTreeDepth,
        _spentVoiceCreditsCommitment,
        _resultsCommitment
      );

      if (!verified) {
        revert IncorrectPerVOSpentVoiceCredits();
      }
    }

    (uint256 startTime, uint256 duration) = poll.getDeployTimeAndDuration();
    address recipient = recipientRegistry.getRecipientAddress(
      _voteOptionIndex,
      startTime,
      startTime + duration
    );
    if (recipient == address(0)) {
      // Send funds back to the matching pool
      recipient = owner();
    }

    uint256 tallyResult = _recipients[_voteOptionIndex].tallyResult;
    uint256 allocatedAmount = getAllocatedAmount(tallyResult, _spent);
    nativeToken.safeTransfer(recipient, allocatedAmount);
    emit FundsClaimed(_voteOptionIndex, recipient, allocatedAmount);
  }

  /**
    * @dev Add and verify tally votes and calculate sum of tally squares for alpha calculation.
    * @param _voteOptionIndex Vote option index.
    * @param _tallyResult The results of vote tally for the recipients.
    * @param _tallyResultProof Proofs of correctness of the vote tally results.
    * @param _tallyResultSalt the respective salt in the results object in the tally.json
    * @param _spentVoiceCreditsHash hashLeftRight(number of spent voice credits, spent salt)
    * @param _perVOSpentVoiceCreditsHash hashLeftRight(merkle root of the no spent voice credits per vote option, perVOSpentVoiceCredits salt)
    */
  function _addTallyResult(
    uint256 _voteOptionIndex,
    uint256 _tallyResult,
    uint256[][] memory _tallyResultProof,
    uint256 _tallyResultSalt,
    uint256 _spentVoiceCreditsHash,
    uint256 _perVOSpentVoiceCreditsHash
  )
    private
  {
    RecipientStatus storage recipient = _recipients[_voteOptionIndex];
    if (recipient.tallyVerified) {
      revert VoteResultsAlreadyVerified();
    }

    (,,, uint8 voteOptionTreeDepth) = poll.treeDepths();
    bool resultVerified = tally.verifyTallyResult(
      _voteOptionIndex,
      _tallyResult,
      _tallyResultProof,
      _tallyResultSalt,
      voteOptionTreeDepth,
      _spentVoiceCreditsHash,
      _perVOSpentVoiceCreditsHash
    );

    if (!resultVerified) {
      revert IncorrectTallyResult();
    }

    recipient.tallyVerified = true;
    recipient.tallyResult = _tallyResult;
    totalVotesSquares = totalVotesSquares + (_tallyResult * _tallyResult);
    totalTallyResults++;
    emit TallyResultsAdded(_voteOptionIndex, _tallyResult);
  }

  /**
    * @dev Add and verify tally results by batch.
    * @param _voteOptionIndices Vote option index.
    * @param _tallyResults The results of vote tally for the recipients.
    * @param _tallyResultProofs Proofs of correctness of the vote tally results.
    * @param _tallyResultSalt the respective salt in the results object in the tally.json
    * @param _spentVoiceCreditsHashes hashLeftRight(number of spent voice credits, spent salt)
    * @param _perVOSpentVoiceCreditsHashes hashLeftRight(merkle root of the no spent voice credits per vote option, perVOSpentVoiceCredits salt)
   */
  function addTallyResultsBatch(
    uint256[] calldata _voteOptionIndices,
    uint256[] calldata _tallyResults,
    uint256[][][] calldata _tallyResultProofs,
    uint256 _tallyResultSalt,
    uint256 _spentVoiceCreditsHashes,
    uint256 _perVOSpentVoiceCreditsHashes
  )
    external
    onlyCoordinator
  {
    if (isAddressZero(address(maci))) revert MaciNotSet();

    if (!isTallied()) {
      revert VotesNotTallied();
    }
    if (isFinalized) {
      revert RoundAlreadyFinalized();
    }

    for (uint256 i = 0; i < _voteOptionIndices.length; i++) {
      _addTallyResult(
        _voteOptionIndices[i],
        _tallyResults[i],
        _tallyResultProofs[i],
        _tallyResultSalt,
        _spentVoiceCreditsHashes,
        _perVOSpentVoiceCreditsHashes
      );
    }
  }

}
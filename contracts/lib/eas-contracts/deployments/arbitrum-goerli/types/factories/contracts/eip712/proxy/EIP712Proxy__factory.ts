/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
  type AddressLike,
  type ContractDeployTransaction,
  type ContractRunner,
  type Signer
} from 'ethers';
import type { NonPayableOverrides } from '../../../../common';
import type { EIP712Proxy, EIP712ProxyInterface } from '../../../../contracts/eip712/proxy/EIP712Proxy';

const _abi = [
  {
    inputs: [
      {
        internalType: 'contract IEAS',
        name: 'eas',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AccessDenied',
    type: 'error'
  },
  {
    inputs: [],
    name: 'DeadlineExpired',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidEAS',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidLength',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidShortString',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidSignature',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotFound',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'str',
        type: 'string'
      }
    ],
    name: 'StringTooLong',
    type: 'error'
  },
  {
    inputs: [],
    name: 'UsedSignature',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'EIP712DomainChanged',
    type: 'event'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address'
              },
              {
                internalType: 'uint64',
                name: 'expirationTime',
                type: 'uint64'
              },
              {
                internalType: 'bool',
                name: 'revocable',
                type: 'bool'
              },
              {
                internalType: 'bytes32',
                name: 'refUID',
                type: 'bytes32'
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct AttestationRequestData',
            name: 'data',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8'
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32'
              }
            ],
            internalType: 'struct Signature',
            name: 'signature',
            type: 'tuple'
          },
          {
            internalType: 'address',
            name: 'attester',
            type: 'address'
          },
          {
            internalType: 'uint64',
            name: 'deadline',
            type: 'uint64'
          }
        ],
        internalType: 'struct DelegatedProxyAttestationRequest',
        name: 'delegatedRequest',
        type: 'tuple'
      }
    ],
    name: 'attestByDelegation',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      {
        internalType: 'bytes1',
        name: 'fields',
        type: 'bytes1'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'verifyingContract',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32'
      },
      {
        internalType: 'uint256[]',
        name: 'extensions',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAttestTypeHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32'
      }
    ],
    name: 'getAttester',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getDomainSeparator',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getEAS',
    outputs: [
      {
        internalType: 'contract IEAS',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getRevokeTypeHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address'
              },
              {
                internalType: 'uint64',
                name: 'expirationTime',
                type: 'uint64'
              },
              {
                internalType: 'bool',
                name: 'revocable',
                type: 'bool'
              },
              {
                internalType: 'bytes32',
                name: 'refUID',
                type: 'bytes32'
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct AttestationRequestData[]',
            name: 'data',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8'
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32'
              }
            ],
            internalType: 'struct Signature[]',
            name: 'signatures',
            type: 'tuple[]'
          },
          {
            internalType: 'address',
            name: 'attester',
            type: 'address'
          },
          {
            internalType: 'uint64',
            name: 'deadline',
            type: 'uint64'
          }
        ],
        internalType: 'struct MultiDelegatedProxyAttestationRequest[]',
        name: 'multiDelegatedRequests',
        type: 'tuple[]'
      }
    ],
    name: 'multiAttestByDelegation',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32'
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'uid',
                type: 'bytes32'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct RevocationRequestData[]',
            name: 'data',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8'
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32'
              }
            ],
            internalType: 'struct Signature[]',
            name: 'signatures',
            type: 'tuple[]'
          },
          {
            internalType: 'address',
            name: 'revoker',
            type: 'address'
          },
          {
            internalType: 'uint64',
            name: 'deadline',
            type: 'uint64'
          }
        ],
        internalType: 'struct MultiDelegatedProxyRevocationRequest[]',
        name: 'multiDelegatedRequests',
        type: 'tuple[]'
      }
    ],
    name: 'multiRevokeByDelegation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32'
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'uid',
                type: 'bytes32'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct RevocationRequestData',
            name: 'data',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8'
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32'
              }
            ],
            internalType: 'struct Signature',
            name: 'signature',
            type: 'tuple'
          },
          {
            internalType: 'address',
            name: 'revoker',
            type: 'address'
          },
          {
            internalType: 'uint64',
            name: 'deadline',
            type: 'uint64'
          }
        ],
        internalType: 'struct DelegatedProxyRevocationRequest',
        name: 'delegatedRequest',
        type: 'tuple'
      }
    ],
    name: 'revokeByDelegation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'version',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

const _bytecode =
  '0x6101e06040523480156200001257600080fd5b5060405162002d5338038062002d5383398101604081905262000035916200022c565b6040805180820190915260058152640312e312e360dc1b60208201526001608081905260a052600060c0819052829190620000729083906200016b565b61018052620000838160016200016b565b6101a052815160208084019190912061014052815190820120610160524661010052620001146101405161016051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60e052505030610120526001600160a01b03821662000146576040516341bc07ff60e11b815260040160405180910390fd5b6001600160a01b0382166101c052600262000162828262000396565b505050620004bc565b60006020835110156200018b576200018383620001a4565b90506200019e565b8162000198848262000396565b5060ff90505b92915050565b600080829050601f81511115620001db578260405163305a27a960e01b8152600401620001d2919062000462565b60405180910390fd5b8051620001e88262000497565b179392505050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156200022357818101518382015260200162000209565b50506000910152565b600080604083850312156200024057600080fd5b82516001600160a01b03811681146200025857600080fd5b60208401519092506001600160401b03808211156200027657600080fd5b818501915085601f8301126200028b57600080fd5b815181811115620002a057620002a0620001f0565b604051601f8201601f19908116603f01168101908382118183101715620002cb57620002cb620001f0565b81604052828152886020848701011115620002e557600080fd5b620002f883602083016020880162000206565b80955050505050509250929050565b600181811c908216806200031c57607f821691505b6020821081036200033d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200039157600081815260208120601f850160051c810160208610156200036c5750805b601f850160051c820191505b818110156200038d5782815560010162000378565b5050505b505050565b81516001600160401b03811115620003b257620003b2620001f0565b620003ca81620003c3845462000307565b8462000343565b602080601f831160018114620004025760008415620003e95750858301515b600019600386901b1c1916600185901b1785556200038d565b600085815260208120601f198616915b82811015620004335788860151825594840194600190910190840162000412565b5085821015620004525787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60208152600082518060208401526200048381604085016020870162000206565b601f01601f19169190910160400192915050565b805160208083015191908110156200033d5760001960209190910360031b1b16919050565b60805160a05160c05160e05161010051610120516101405161016051610180516101a0516101c0516127f46200055f600039600081816101e4015281816104d0015281816105e701528181610a980152610c75015260006107f6015260006107cc015260006113b60152600061138e015260006112e9015260006113130152600061133d015260006107740152600061074b0152600061072201526127f46000f3fe6080604052600436106100c75760003560e01c806365c40b9c11610074578063a6d4dbc71161004e578063a6d4dbc714610250578063b83010d314610263578063ed24911d1461029657600080fd5b806365c40b9c146101d557806384b0196e14610208578063954115251461023057600080fd5b806317d7de7c116100a557806317d7de7c1461018b5780633c042715146101ad57806354fd4d50146101c057600080fd5b80630eabf660146100cc57806310d736d5146100e157806312b11a171461014e575b600080fd5b6100df6100da3660046119dd565b6102ab565b005b3480156100ed57600080fd5b506101246100fc366004611a1f565b60009081526003602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b34801561015a57600080fd5b507f4120d3b28306666b714826ad7cb70744d9658ad3e6cd873411bedadcf55afda75b604051908152602001610145565b34801561019757600080fd5b506101a061053e565b6040516101459190611aa6565b61017d6101bb366004611ac0565b6105d0565b3480156101cc57600080fd5b506101a061071b565b3480156101e157600080fd5b507f0000000000000000000000000000000000000000000000000000000000000000610124565b34801561021457600080fd5b5061021d6107be565b6040516101459796959493929190611afb565b61024361023e3660046119dd565b610862565b6040516101459190611bba565b6100df61025e366004611bfe565b610c5c565b34801561026f57600080fd5b507f96bdbea8fa280f8a0d0835587e1fbb1470e81d05c44514158443340cea40a05d61017d565b3480156102a257600080fd5b5061017d610d5c565b60008167ffffffffffffffff8111156102c6576102c6611c17565b60405190808252806020026020018201604052801561030c57816020015b6040805180820190915260008152606060208201528152602001906001900390816102e45790505b50905060005b8281101561049257600084848381811061032e5761032e611c46565b90506020028101906103409190611c75565b61034990611ee2565b602081015180519192509015806103665750816040015151815114155b1561039d576040517f947d5a8400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b81518110156104485760008282815181106103bd576103bd611c46565b6020026020010151905061043f6040518060a0016040528086600001518152602001838152602001866040015185815181106103fb576103fb611c46565b60200260200101518152602001866060015173ffffffffffffffffffffffffffffffffffffffff168152602001866080015167ffffffffffffffff16815250610d6b565b506001016103a0565b506040518060400160405280836000015181526020018281525084848151811061047457610474611c46565b6020026020010181905250505061048b8160010190565b9050610312565b506040517f4cb7e9e500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690634cb7e9e5903490610507908590600401611fdd565b6000604051808303818588803b15801561052057600080fd5b505af1158015610534573d6000803e3d6000fd5b5050505050505050565b60606002805461054d906120ac565b80601f0160208091040260200160405190810160405280929190818152602001828054610579906120ac565b80156105c65780601f1061059b576101008083540402835291602001916105c6565b820191906000526020600020905b8154815290600101906020018083116105a957829003601f168201915b5050505050905090565b60006105e36105de8361221d565b610f9e565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663f17325e7346040518060400160405280876000013581526020018780602001906106479190612296565b610650906122ca565b8152506040518363ffffffff1660e01b815260040161066f9190612349565b60206040518083038185885af115801561068d573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906106b29190612376565b90506106c460c0840160a0850161238f565b600082815260036020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff9290921691909117905592915050565b60606107467f0000000000000000000000000000000000000000000000000000000000000000611166565b61076f7f0000000000000000000000000000000000000000000000000000000000000000611166565b6107987f0000000000000000000000000000000000000000000000000000000000000000611166565b6040516020016107aa939291906123aa565b604051602081830303815290604052905090565b6000606080828080836107f17f000000000000000000000000000000000000000000000000000000000000000083611224565b61081c7f00000000000000000000000000000000000000000000000000000000000000006001611224565b604080516000808252602082019092527f0f000000000000000000000000000000000000000000000000000000000000009b939a50919850469750309650945092509050565b606060008267ffffffffffffffff81111561087f5761087f611c17565b6040519080825280602002602001820160405280156108c557816020015b60408051808201909152600081526060602082015281526020019060019003908161089d5790505b50905060005b83811015610a9357368585838181106108e6576108e6611c46565b90506020028101906108f89190611c75565b905036600061090a6020840184612420565b909250905080158061092a57506109246040840184612488565b82141590505b15610961576040517f947d5a8400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b81811015610a4257610a3a6040518060a001604052808660000135815260200185858581811061099657610996611c46565b90506020028101906109a89190612296565b6109b1906122ca565b81526020016109c36040880188612488565b858181106109d3576109d3611c46565b9050606002018036038101906109e991906124ef565b81526020016109fe608088016060890161238f565b73ffffffffffffffffffffffffffffffffffffffff168152602001610a2960a088016080890161250b565b67ffffffffffffffff169052610f9e565b600101610964565b50604080518082019091528335815260208101610a5f8385612526565b815250858581518110610a7457610a74611c46565b6020026020010181905250505050610a8c8160010190565b90506108cb565b5060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166344adc90e34846040518363ffffffff1660e01b8152600401610af0919061259a565b60006040518083038185885af1158015610b0e573d6000803e3d6000fd5b50505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610b55919081019061268d565b90506000805b85811015610c4f5736878783818110610b7657610b76611c46565b9050602002810190610b889190611c75565b9050366000610b9a6020840184612420565b9150915060005b81811015610c3a57610bb9608085016060860161238f565b60036000898981518110610bcf57610bcf611c46565b6020026020010151815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550856001019550610c338160010190565b9050610ba1565b50505050610c488160010190565b9050610b5b565b5090925050505b92915050565b610c73610c6e3683900383018361271e565b610d6b565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663469262673460405180604001604052808560000135815260200185602001803603810190610cd9919061278a565b90526040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815281516004820152602091820151805160248301529091015160448201526064016000604051808303818588803b158015610d4057600080fd5b505af1158015610d54573d6000803e3d6000fd5b505050505050565b6000610d666112cf565b905090565b608081015167ffffffffffffffff1615801590610da057504267ffffffffffffffff16816080015167ffffffffffffffff1611155b15610dd7576040517f1ab7da6b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60208082015180516000908152600390925260409091205473ffffffffffffffffffffffffffffffffffffffff1680610e3c576040517fc5723b5100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff81163314610e8b576040517f4ca8886700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040830151610e9981611407565b835183516080860151604051600093610f1593610efa937f96bdbea8fa280f8a0d0835587e1fbb1470e81d05c44514158443340cea40a05d936020019384526020840192909252604083015267ffffffffffffffff16606082015260800190565b60405160208183030381529060405280519060200120611515565b9050846060015173ffffffffffffffffffffffffffffffffffffffff16610f4a8284600001518560200151866040015161155d565b73ffffffffffffffffffffffffffffffffffffffff1614610f97576040517f8baa579f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050505050565b608081015167ffffffffffffffff1615801590610fd357504267ffffffffffffffff16816080015167ffffffffffffffff1611155b1561100a576040517f1ab7da6b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6020810151604082015161101d81611407565b60006110de7f4120d3b28306666b714826ad7cb70744d9658ad3e6cd873411bedadcf55afda760001b856000015185600001518660200151876040015188606001518960800151805190602001208b60800151604051602001610efa989796959493929190978852602088019690965273ffffffffffffffffffffffffffffffffffffffff94909416604087015267ffffffffffffffff9283166060870152901515608086015260a085015260c08401919091521660e08201526101000190565b9050836060015173ffffffffffffffffffffffffffffffffffffffff166111138284600001518560200151866040015161155d565b73ffffffffffffffffffffffffffffffffffffffff1614611160576040517f8baa579f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6060600061117383611585565b600101905060008167ffffffffffffffff81111561119357611193611c17565b6040519080825280601f01601f1916602001820160405280156111bd576020820181803683370190505b5090508181016020015b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85049450846111c757509392505050565b606060ff831461123e5761123783611667565b9050610c56565b81805461124a906120ac565b80601f0160208091040260200160405190810160405280929190818152602001828054611276906120ac565b80156112c35780601f10611298576101008083540402835291602001916112c3565b820191906000526020600020905b8154815290600101906020018083116112a657829003601f168201915b50505050509050610c56565b60003073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614801561133557507f000000000000000000000000000000000000000000000000000000000000000046145b1561135f57507f000000000000000000000000000000000000000000000000000000000000000090565b610d66604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b8051602080830151604080850151905160f89490941b7fff00000000000000000000000000000000000000000000000000000000000000169284019290925260218301526041820152600090606101604051602081830303815290604052905060048160405161147791906127a6565b9081526040519081900360200190205460ff16156114c1576040517fcce9a82400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016004826040516114d391906127a6565b90815260405190819003602001902080549115157fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009092169190911790555050565b6000610c566115226112cf565b836040517f19010000000000000000000000000000000000000000000000000000000000008152600281019290925260228201526042902090565b600080600061156e878787876116a6565b9150915061157b81611795565b5095945050505050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106115ce577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef810000000083106115fa576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061161857662386f26fc10000830492506010015b6305f5e1008310611630576305f5e100830492506008015b612710831061164457612710830492506004015b60648310611656576064830492506002015b600a8310610c565760010192915050565b6060600061167483611950565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156116dd575060009050600361178c565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611731573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81166117855760006001925092505061178c565b9150600090505b94509492505050565b60008160048111156117a9576117a96127b8565b036117b15750565b60018160048111156117c5576117c56127b8565b03611831576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064015b60405180910390fd5b6002816004811115611845576118456127b8565b036118ac576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401611828565b60038160048111156118c0576118c06127b8565b0361194d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401611828565b50565b600060ff8216601f811115610c56576040517fb3512b0c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008083601f8401126119a357600080fd5b50813567ffffffffffffffff8111156119bb57600080fd5b6020830191508360208260051b85010111156119d657600080fd5b9250929050565b600080602083850312156119f057600080fd5b823567ffffffffffffffff811115611a0757600080fd5b611a1385828601611991565b90969095509350505050565b600060208284031215611a3157600080fd5b5035919050565b60005b83811015611a53578181015183820152602001611a3b565b50506000910152565b60008151808452611a74816020860160208601611a38565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000611ab96020830184611a5c565b9392505050565b600060208284031215611ad257600080fd5b813567ffffffffffffffff811115611ae957600080fd5b820160e08185031215611ab957600080fd5b7fff00000000000000000000000000000000000000000000000000000000000000881681526000602060e081840152611b3760e084018a611a5c565b8381036040850152611b49818a611a5c565b6060850189905273ffffffffffffffffffffffffffffffffffffffff8816608086015260a0850187905284810360c0860152855180825283870192509083019060005b81811015611ba857835183529284019291840191600101611b8c565b50909c9b505050505050505050505050565b6020808252825182820181905260009190848201906040850190845b81811015611bf257835183529284019291840191600101611bd6565b50909695505050505050565b60006101008284031215611c1157600080fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61833603018112611ca957600080fd5b9190910192915050565b60405160a0810167ffffffffffffffff81118282101715611cd657611cd6611c17565b60405290565b60405160c0810167ffffffffffffffff81118282101715611cd657611cd6611c17565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611d4657611d46611c17565b604052919050565b600067ffffffffffffffff821115611d6857611d68611c17565b5060051b60200190565b600060408284031215611d8457600080fd5b6040516040810181811067ffffffffffffffff82111715611da757611da7611c17565b604052823581526020928301359281019290925250919050565b600060608284031215611dd357600080fd5b6040516060810181811067ffffffffffffffff82111715611df657611df6611c17565b604052905080823560ff81168114611e0d57600080fd5b8082525060208301356020820152604083013560408201525092915050565b600082601f830112611e3d57600080fd5b81356020611e52611e4d83611d4e565b611cff565b82815260609283028501820192828201919087851115611e7157600080fd5b8387015b85811015611e9457611e878982611dc1565b8452928401928101611e75565b5090979650505050505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611ec557600080fd5b919050565b803567ffffffffffffffff81168114611ec557600080fd5b600060a08236031215611ef457600080fd5b611efc611cb3565b8235815260208084013567ffffffffffffffff80821115611f1c57600080fd5b9085019036601f830112611f2f57600080fd5b8135611f3d611e4d82611d4e565b81815260069190911b83018401908481019036831115611f5c57600080fd5b938501935b82851015611f8557611f733686611d72565b82528582019150604085019450611f61565b80868801525050506040860135925080831115611fa157600080fd5b5050611faf36828601611e2c565b604083015250611fc160608401611ea1565b6060820152611fd260808401611eca565b608082015292915050565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b8481101561209d578984037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0018652825180518552880151888501889052805188860181905290890190839060608701905b808310156120885761207482855180518252602090810151910152565b928b019260019290920191908a0190612057565b50978a01979550505091870191600101612005565b50919998505050505050505050565b600181811c908216806120c057607f821691505b602082108103611c11577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600082601f83011261210a57600080fd5b813567ffffffffffffffff81111561212457612124611c17565b61215560207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611cff565b81815284602083860101111561216a57600080fd5b816020850160208301376000918101602001919091529392505050565b600060c0828403121561219957600080fd5b6121a1611cdc565b90506121ac82611ea1565b81526121ba60208301611eca565b6020820152604082013580151581146121d257600080fd5b604082015260608281013590820152608082013567ffffffffffffffff8111156121fb57600080fd5b612207848285016120f9565b60808301525060a082013560a082015292915050565b600060e0823603121561222f57600080fd5b612237611cb3565b82358152602083013567ffffffffffffffff81111561225557600080fd5b61226136828601612187565b6020830152506122743660408501611dc1565b604082015261228560a08401611ea1565b6060820152611fd260c08401611eca565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff41833603018112611ca957600080fd5b6000610c563683612187565b73ffffffffffffffffffffffffffffffffffffffff815116825267ffffffffffffffff6020820151166020830152604081015115156040830152606081015160608301526000608082015160c0608085015261233560c0850182611a5c565b60a093840151949093019390935250919050565b60208152815160208201526000602083015160408084015261236e60608401826122d6565b949350505050565b60006020828403121561238857600080fd5b5051919050565b6000602082840312156123a157600080fd5b611ab982611ea1565b600084516123bc818460208901611a38565b80830190507f2e0000000000000000000000000000000000000000000000000000000000000080825285516123f8816001850160208a01611a38565b60019201918201528351612413816002840160208801611a38565b0160020195945050505050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261245557600080fd5b83018035915067ffffffffffffffff82111561247057600080fd5b6020019150600581901b36038213156119d657600080fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126124bd57600080fd5b83018035915067ffffffffffffffff8211156124d857600080fd5b60200191506060810236038213156119d657600080fd5b60006060828403121561250157600080fd5b611ab98383611dc1565b60006020828403121561251d57600080fd5b611ab982611eca565b6000612534611e4d84611d4e565b80848252602080830192508560051b85013681111561255257600080fd5b855b8181101561258e57803567ffffffffffffffff8111156125745760008081fd5b61258036828a01612187565b865250938201938201612554565b50919695505050505050565b602080825282518282018190526000919060409081850190600581811b8701840188860187805b8581101561267d577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08b85030187528251805185528901518985018990528051898601819052908a0190606081881b870181019190870190855b81811015612667577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa08985030183526126558486516122d6565b948e01949350918d019160010161261b565b505050978a0197945050918801916001016125c1565b50919a9950505050505050505050565b600060208083850312156126a057600080fd5b825167ffffffffffffffff8111156126b757600080fd5b8301601f810185136126c857600080fd5b80516126d6611e4d82611d4e565b81815260059190911b820183019083810190878311156126f557600080fd5b928401925b82841015612713578351825292840192908401906126fa565b979650505050505050565b6000610100828403121561273157600080fd5b612739611cb3565b8235815261274a8460208501611d72565b602082015261275c8460608501611dc1565b604082015261276d60c08401611ea1565b606082015261277e60e08401611eca565b60808201529392505050565b60006040828403121561279c57600080fd5b611ab98383611d72565b60008251611ca9818460208701611a38565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea164736f6c6343000813000a';

type EIP712ProxyConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: EIP712ProxyConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class EIP712Proxy__factory extends ContractFactory {
  constructor(...args: EIP712ProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    eas: AddressLike,
    name: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(eas, name, overrides || {});
  }
  override deploy(eas: AddressLike, name: string, overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(eas, name, overrides || {}) as Promise<
      EIP712Proxy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): EIP712Proxy__factory {
    return super.connect(runner) as EIP712Proxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EIP712ProxyInterface {
    return new Interface(_abi) as EIP712ProxyInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): EIP712Proxy {
    return new Contract(address, _abi, runner) as unknown as EIP712Proxy;
  }
}

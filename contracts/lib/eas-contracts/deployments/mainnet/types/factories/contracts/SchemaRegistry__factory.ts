/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import { Contract, ContractFactory, Overrides, Signer, utils } from 'ethers';
import type { PromiseOrValue } from '../../common';
import type { SchemaRegistry, SchemaRegistryInterface } from '../../contracts/SchemaRegistry';

const _abi = [
  {
    inputs: [],
    name: 'AlreadyExists',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'registerer',
        type: 'address'
      }
    ],
    name: 'Registered',
    type: 'event'
  },
  {
    inputs: [],
    name: 'VERSION',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32'
      }
    ],
    name: 'getSchema',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'uid',
            type: 'bytes32'
          },
          {
            internalType: 'contract ISchemaResolver',
            name: 'resolver',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'revocable',
            type: 'bool'
          },
          {
            internalType: 'string',
            name: 'schema',
            type: 'string'
          }
        ],
        internalType: 'struct SchemaRecord',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'schema',
        type: 'string'
      },
      {
        internalType: 'contract ISchemaResolver',
        name: 'resolver',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'revocable',
        type: 'bool'
      }
    ],
    name: 'register',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

const _bytecode =
  '0x60808060405234610016576107b8908161001c8239f35b600080fdfe60806040908082526004918236101561001757600080fd5b600091823560e01c90816360d7a2781461029757508063a2ea7c6e146101045763ffa1ad741461004657600080fd5b3461010057817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610100578051918183019083821067ffffffffffffffff8311176100d45750926100d093825282527f302e323600000000000000000000000000000000000000000000000000000000602083015251918291602083526020830190610689565b0390f35b806041867f4e487b71000000000000000000000000000000000000000000000000000000006024945252fd5b5080fd5b503461010057602092837ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610293576060808351610144816106cc565b85815285878201528585820152015235825281835280822090805191610169836106cc565b805483526001918282015491868501600273ffffffffffffffffffffffffffffffffffffffff92838616835260ff8589019660a01c16151586520188845196898354936101b585610758565b808b52948381169081156102505750600114610214575b50505050506101e1856100d097980386610717565b606087019485528251978897818952519088015251169085015251151560608401525160808084015260a0830190610689565b908094939b50528983205b82841061023d575050508501909601956101e1886100d087386101cc565b80548985018c0152928a0192810161021f565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016858c01525050505090151560051b86010196506101e1886100d087386101cc565b8280fd5b92939050346106625760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126106625780359067ffffffffffffffff80831161065e573660238401121561065e57828201359181831161065a57366024848601011161065a576024359673ffffffffffffffffffffffffffffffffffffffff9182891680990361010057604435978815158099036102935761033b816106cc565b8281526020998a8201908152888201998a52885197848c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe099818b601f83011601610386908d610717565b808c5280828d019460240185378b0101528b6060840199808b5283518d5115158d519384938185019687915180926103bd92610666565b84019260601b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000169083015260f81b6034820152036015810182526035016104059082610717565b519020998a8552848c5289852054610632579082918b600294528b8652858d528a8620925183556001968784019251167fffffffffffffffffffffff00000000000000000000000000000000000000000074ff000000000000000000000000000000000000000084549351151560a01b1692161717905501955190815194851161060657506104948654610758565b601f81116105c0575b508891601f8511600114610545578495509084939492919361051a575b50507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff91921b9260031b1c19161790555b817f7d917fcbc9a29a9705ff9936ffa599500e4fd902e4486bae317414fe967b307c848351338152a251908152f35b015191507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff386104ba565b9294849081168785528a8520945b8b888383106105a95750505010610572575b505050811b0190556104eb565b01517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88460031b161c19169055388080610565565b868601518855909601959485019487935001610553565b868352898320601f860160051c8101918b87106105fc575b601f0160051c019084905b8281106105f157505061049d565b8481550184906105e3565b90915081906105d8565b8260416024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b838a517f23369fa6000000000000000000000000000000000000000000000000000000008152fd5b8680fd5b8580fd5b8380fd5b60005b8381106106795750506000910152565b8181015183820152602001610669565b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f6020936106c581518092818752878088019101610666565b0116010190565b6080810190811067ffffffffffffffff8211176106e857604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff8211176106e857604052565b90600182811c921680156107a1575b602083101461077257565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f169161076756fea164736f6c6343000812000a';

type SchemaRegistryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: SchemaRegistryConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class SchemaRegistry__factory extends ContractFactory {
  constructor(...args: SchemaRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<SchemaRegistry> {
    return super.deploy(overrides || {}) as Promise<SchemaRegistry>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SchemaRegistry {
    return super.attach(address) as SchemaRegistry;
  }
  override connect(signer: Signer): SchemaRegistry__factory {
    return super.connect(signer) as SchemaRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SchemaRegistryInterface {
    return new utils.Interface(_abi) as SchemaRegistryInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): SchemaRegistry {
    return new Contract(address, _abi, signerOrProvider) as SchemaRegistry;
  }
}

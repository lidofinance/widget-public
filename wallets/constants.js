import MetamaskIcon from '../assets/icons/metamask.svg';

export const METAMASK_TYPE = 'metamask';

const METAMASK = {
  name: 'Metamask',
  type: METAMASK_TYPE,
  Icon: MetamaskIcon,
};

export const supportedWallets = [METAMASK];

export const LIDO_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_referral',
        type: 'address',
      },
    ],
    name: 'submit',
    outputs: [
      {
        name: 'StETH',
        type: 'uint256',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
];

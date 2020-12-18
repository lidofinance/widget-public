/* eslint-disable prefer-destructuring */
export const ACTIVE_CHAIN_ID = +process.env.ACTIVE_CHAIN_ID;
export const LIDO_CONTRACT_ADDRESS = process.env.LIDO_CONTRACT_ADDRESS;
export const SUBMIT_GAS_LIMIT = +process.env.SUBMIT_GAS_LIMIT || '300000';

export const MAINNET_CHAIN_ID = 1;
export const RINKEBY_CHAIN_ID = 4;
export const GOERLI_CHAIN_ID = 5;
export const LOCAL_CHAIN_ID = 1337;

export const CHAINS = {
  [MAINNET_CHAIN_ID]: 'Mainnet',
  [RINKEBY_CHAIN_ID]: 'Rinkeby',
  [GOERLI_CHAIN_ID]: 'Goerli',
  [LOCAL_CHAIN_ID]: 'Local',
};

export const ETHERSCAN_PREFIXES = {
  [MAINNET_CHAIN_ID]: '',
  [RINKEBY_CHAIN_ID]: 'rinkeby.',
  [GOERLI_CHAIN_ID]: 'goerli.',
};

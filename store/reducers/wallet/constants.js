const GET = '_GET';
const SET = '_SET';
const FAIL = '_FAIL';
const RESET = '_RESET';
const START = '_START';

const WALLET = 'WALLET';
export const WALLET_RESET = WALLET + RESET;
export const WALLET_RESET_START = WALLET_RESET + START;

const ERROR = 'ERROR';
export const ERROR_RESET = ERROR + RESET;

const PROVIDER = 'PROVIDER';
export const PROVIDER_GET = PROVIDER + GET;
export const PROVIDER_SET = PROVIDER + SET;
export const PROVIDER_FAIL = PROVIDER + FAIL;

const ACCOUNT = 'ACCOUNT';
export const ACCOUNT_GET = ACCOUNT + GET;
export const ACCOUNT_SET = ACCOUNT + SET;
export const ACCOUNT_FAIL = ACCOUNT + FAIL;
export const ACCOUNT_RESET = ACCOUNT + RESET;

const STAKE = 'STAKE';
export const STAKE_GET = STAKE + GET;
export const STAKE_SET = STAKE + SET;
export const STAKE_FAIL = STAKE + FAIL;

const MINING = 'MINING';
export const MINING_SET = MINING + SET;
export const MINING_FAIL = MINING + FAIL;

const TX_COST_ESTIMATE = 'TX_COST_ESTIMATE';
export const TX_COST_ESTIMATE_GET = TX_COST_ESTIMATE + GET;
export const TX_COST_ESTIMATE_SET = TX_COST_ESTIMATE + SET;
export const TX_COST_ESTIMATE_FAIL = TX_COST_ESTIMATE + FAIL;
export const TX_COST_ESTIMATE_RESET = TX_COST_ESTIMATE + RESET;

import { createAction } from 'redux-actions';
import {
  ACCOUNT_FAIL,
  ACCOUNT_GET,
  ACCOUNT_SET,
  ERROR_RESET,
  MINING_FAIL,
  MINING_SET,
  PROVIDER_FAIL,
  PROVIDER_GET,
  PROVIDER_SET,
  STAKE_FAIL,
  STAKE_GET,
  STAKE_SET,
  TX_COST_ESTIMATE_FAIL,
  TX_COST_ESTIMATE_GET,
  TX_COST_ESTIMATE_SET,
  WALLET_RESET,
  WALLET_RESET_START,
} from './constants';

export const startResetWalletAction = createAction(WALLET_RESET_START);
export const resetWalletAction = createAction(WALLET_RESET);

export const resetErrorAction = createAction(ERROR_RESET);

export const getProviderAction = createAction(PROVIDER_GET);
export const setProviderAction = createAction(PROVIDER_SET);
export const failProviderAction = createAction(PROVIDER_FAIL);

export const getAccountAction = createAction(ACCOUNT_GET);
export const setAccountAction = createAction(ACCOUNT_SET);
export const failAccountAction = createAction(ACCOUNT_FAIL);

export const getStakeAction = createAction(STAKE_GET);
export const setStakeAction = createAction(STAKE_SET);
export const failStakeAction = createAction(STAKE_FAIL);

export const setMiningAction = createAction(MINING_SET);
export const failMiningAction = createAction(MINING_FAIL);

export const getTxCostEstimateAction = createAction(TX_COST_ESTIMATE_GET);
export const setTxCostEstimateAction = createAction(TX_COST_ESTIMATE_SET);
export const failTxCostEstimateAction = createAction(TX_COST_ESTIMATE_FAIL);

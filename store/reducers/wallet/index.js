/* eslint-disable no-console */
import {
  ACCOUNT_FAIL,
  ACCOUNT_GET,
  ACCOUNT_RESET,
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
  TX_COST_ESTIMATE_RESET,
  TX_COST_ESTIMATE_SET,
  WALLET_RESET,
  WALLET_RESET_START,
} from './constants';

const defaultAccount = {
  isConnected: false,
  address: '',
  balance: '0',
  stake: '0',
  maxStake: '0',
};

const initialState = {
  walletType: null,
  pending: false,
  error: null,
  txCost: '$0.00',
  provider: null,
  account: defaultAccount,
  etherscanPage: '',
  eth2stake: '0',
};

const pendingState = {
  pending: true,
  error: '',
};

const successState = {
  pending: false,
  error: '',
};

export default function wallet(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case WALLET_RESET_START:
      return { ...state, ...pendingState };
    case WALLET_RESET:
      return { ...initialState, txCost: state.txCost };

    case ERROR_RESET:
      return { ...state, error: '' };

    case PROVIDER_GET:
      return { ...state, ...pendingState, walletType: payload };
    case PROVIDER_SET:
      return { ...state, ...successState, provider: payload };
    case PROVIDER_FAIL:
      console.error(payload);
      return { ...state, pending: false, error: payload };

    case ACCOUNT_GET:
      return { ...state, pending: true };
    case ACCOUNT_SET:
      return { ...state, ...successState, account: payload, eth2stake: '0' };
    case ACCOUNT_FAIL:
      console.error(payload);
      return {
        ...state,
        account: defaultAccount,
        pending: false,
        error: payload,
      };
    case ACCOUNT_RESET:
      return { ...state, ...successState, account: defaultAccount };

    case STAKE_GET:
      return {
        ...state,
        ...pendingState,
        eth2stake: payload,
        etherscanPage: '',
      };
    case STAKE_SET:
      return { ...state, etherscanPage: payload };
    case STAKE_FAIL:
      console.error(payload);
      return { ...state, pending: false, etherscanPage: '', error: payload };

    case MINING_SET:
      return { ...state };
    case MINING_FAIL:
      console.error(payload);
      return { ...state, pending: false, error: payload };

    case TX_COST_ESTIMATE_GET:
      return { ...state, error: '', txCost: 'Loading...' };
    case TX_COST_ESTIMATE_SET:
      return { ...state, ...successState, txCost: payload };
    case TX_COST_ESTIMATE_FAIL:
      console.error(payload);
      return { ...state, txCost: '$0.00', error: payload };
    case TX_COST_ESTIMATE_RESET:
      return { ...state, ...successState, txCost: '$0.00' };

    default:
      return state;
  }
}

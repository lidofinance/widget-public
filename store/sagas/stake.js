import { call, put, select, takeEvery } from 'redux-saga/effects';
import { STAKE_GET } from '../reducers/wallet/constants';
import { openStakeLoading, closeStakeLoading } from '../reducers/ui/actions';
import {
  getEtherscanPage,
  stakeAsync,
  waitForMiningAsync,
} from '../../wallets';
import {
  failStakeAction,
  getAccountAction,
  setMiningAction,
  setStakeAction,
} from '../reducers/wallet/actions';
import {
  eth2stakeSelector,
  providerSelector,
} from '../reducers/wallet/selectors';

function* miningFlow(transaction) {
  const tx = yield waitForMiningAsync(transaction);
  if (tx) {
    yield put(setMiningAction());
  } else {
    throw new Error('Failed to mine transaction');
  }
}

function* stakeFlow() {
  try {
    const provider = yield select(providerSelector);
    const eth2stake = yield select(eth2stakeSelector);

    yield put(openStakeLoading());
    const transaction = yield stakeAsync(provider, eth2stake);
    const { chainId, hash } = transaction;
    const txEtherscanPage = getEtherscanPage(chainId, hash);
    yield put(setStakeAction(txEtherscanPage));

    yield call(miningFlow, transaction);
    yield put(getAccountAction());
  } catch (e) {
    yield put(closeStakeLoading());
    yield put(failStakeAction(e.message));
  }
}

export default function* watchStakeGet() {
  yield takeEvery(STAKE_GET, stakeFlow);
}

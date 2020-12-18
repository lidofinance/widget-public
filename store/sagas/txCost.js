import { put, takeLatest } from 'redux-saga/effects';

import { TX_COST_ESTIMATE_GET } from '../reducers/wallet/constants';
import { failTxCostEstimateAction, setTxCostEstimateAction } from '../reducers/wallet/actions';

import { getTxCostAsync } from '../../wallets/index';

function* txCostFlow() {
  try {
    const txCost = yield getTxCostAsync();

    if (txCost) {
      yield put(setTxCostEstimateAction(txCost));
    } else {
      throw new Error('Failed to estimate transaction cost!');
    }
  } catch (e) {
    yield put(failTxCostEstimateAction(e.message));
  }
}

export default function* watchTxCostGet() {
  yield takeLatest(TX_COST_ESTIMATE_GET, txCostFlow);
}

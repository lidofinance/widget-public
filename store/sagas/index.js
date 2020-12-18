import { all } from 'redux-saga/effects';
import watchGetProvider from './provider';
import watchAccountGet from './account';
import watchTxCostGet from './txCost';
import watchStakeGet from './stake';
import watchReset from './reset';

export default function* rootSaga() {
  yield all([watchGetProvider(), watchAccountGet(), watchTxCostGet(), watchStakeGet(), watchReset()]);
}

import { put, select, takeEvery } from 'redux-saga/effects';
import { WALLET_RESET_START } from '../reducers/wallet/constants';
import { resetAsync } from '../../wallets';
import { resetWalletAction } from '../reducers/wallet/actions';
import { closeAccountInfoAction } from '../reducers/ui/actions';
import { providerSelector } from '../reducers/wallet/selectors';

function* resetFlow() {
  try {
    const provider = yield select(providerSelector);
    yield resetAsync(provider);

    yield put(resetWalletAction());
    yield put(closeAccountInfoAction());
  } catch (e) {
    yield put(resetWalletAction());
    yield put(closeAccountInfoAction());
  }
}

export default function* watchReset() {
  yield takeEvery(WALLET_RESET_START, resetFlow);
}

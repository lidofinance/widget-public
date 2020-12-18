import { call, put, select, takeEvery } from 'redux-saga/effects';

import { PROVIDER_GET } from '../reducers/wallet/constants';

import { walletTypeSelector } from '../reducers/wallet/selectors';
import {
  failProviderAction,
  getAccountAction,
  setProviderAction,
} from '../reducers/wallet/actions';

import { getProviderAsync } from '../../wallets';

function* providerFlow() {
  const walletType = yield select(walletTypeSelector);

  try {
    const provider = yield call(getProviderAsync, walletType);

    if (provider) {
      yield put(setProviderAction(provider));
      yield put(getAccountAction());
    } else {
      throw new Error('Provider not found!');
    }
  } catch (e) {
    yield put(failProviderAction(e.message));
  }
}

export default function* watchGetProvider() {
  yield takeEvery(PROVIDER_GET, providerFlow);
}

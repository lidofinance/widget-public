import { eventChannel } from 'redux-saga';
import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { ACCOUNT_GET } from '../reducers/wallet/constants';
import { getAccountAsync, throwIfUnsupportedChain } from '../../wallets';
import {
  failAccountAction,
  setAccountAction,
} from '../reducers/wallet/actions';
import { closeConnectDialog, resetUiAction } from '../reducers/ui/actions';
import { providerSelector } from '../reducers/wallet/selectors';

function* updateAccount(provider) {
  const account = yield call(getAccountAsync, provider);
  if (account) {
    yield put(setAccountAction(account));
    yield put(closeConnectDialog());
  } else {
    throw new Error('Account not found!');
  }
}

function* listenForAccountChanges(provider) {
  const channel = eventChannel((emitter) => {
    const listener = provider.on('accountsChanged', (accounts) => {
      emitter(accounts);
    });
    return () => {
      provider.removeListener('accountsChanged', listener);
    };
  });

  while (true) {
    try {
      const accounts = yield take(channel);

      if (accounts.length > 0) {
        yield put(resetUiAction());
        yield call(updateAccount, provider);
      } else {
        throw new Error('No account connected!');
      }
    } catch (e) {
      yield put(failAccountAction(e.message));
      yield put(closeConnectDialog());
    }
  }
}

function* listenForChainChanges(provider) {
  const channel = eventChannel((emitter) => {
    const listener = provider.on('chainChanged', (chainId) => {
      emitter(chainId);
    });
    return () => {
      provider.removeListener('chainChanged', listener);
    };
  });

  while (true) {
    try {
      const chainIdHex = yield take(channel);
      const chainId = parseInt(chainIdHex, 16);
      yield put(resetUiAction());
      throwIfUnsupportedChain(chainId);
      yield call(updateAccount, provider);
    } catch (e) {
      yield put(failAccountAction(e.message));
      yield put(closeConnectDialog());
    }
  }
}

function* accountFlow() {
  try {
    const provider = yield select(providerSelector);
    yield fork(listenForAccountChanges, provider);
    yield fork(listenForChainChanges, provider);

    yield call(updateAccount, provider);
  } catch (e) {
    yield put(failAccountAction(e.message));
    yield put(closeConnectDialog());
  }
}

export default function* watchAccountGet() {
  yield takeEvery(ACCOUNT_GET, accountFlow);
}

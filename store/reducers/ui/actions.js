import { createAction } from 'redux-actions';
import {
  CLOSE_ACCOUNT_INFO,
  CLOSE_CONNECT_DIALOG,
  CLOSE_STAKE_LOADING,
  OPEN_ACCOUNT_INFO,
  OPEN_CONNECT_DIALOG,
  OPEN_STAKE_LOADING,
  UI_RESET,
} from './constants';

export const openConnectDialog = createAction(OPEN_CONNECT_DIALOG);
export const closeConnectDialog = createAction(CLOSE_CONNECT_DIALOG);

export const openStakeLoading = createAction(OPEN_STAKE_LOADING);
export const closeStakeLoading = createAction(CLOSE_STAKE_LOADING);

export const openAccountInfoAction = createAction(OPEN_ACCOUNT_INFO);
export const closeAccountInfoAction = createAction(CLOSE_ACCOUNT_INFO);

export const resetUiAction = createAction(UI_RESET);

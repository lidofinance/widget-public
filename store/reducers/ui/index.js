import * as types from './constants';

const initialState = {
  connectDialogOpen: false,
  stakeLoadingOpen: false,
  accountInfoOpen: false,
};

export default function wallet(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case types.OPEN_CONNECT_DIALOG:
      return { ...state, connectDialogOpen: true };
    case types.CLOSE_CONNECT_DIALOG:
      return { ...state, connectDialogOpen: false };
    case types.OPEN_STAKE_LOADING:
      return { ...state, stakeLoadingOpen: true };
    case types.CLOSE_STAKE_LOADING:
      return { ...state, stakeLoadingOpen: false };
    case types.OPEN_ACCOUNT_INFO:
      return { ...state, accountInfoOpen: true };
    case types.CLOSE_ACCOUNT_INFO:
      return { ...state, accountInfoOpen: false };
    case types.UI_RESET:
      return initialState;
    default:
      return state;
  }
}

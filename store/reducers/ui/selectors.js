import { createSelector } from 'reselect';

export const getUiState = (state) => state.ui;
export const getConnectDialogOpen = createSelector(getUiState, (ui) => ui.connectDialogOpen);
export const getStakeLoadingOpen = createSelector(getUiState, (ui) => ui.stakeLoadingOpen);
export const getAccountInfoOpen = createSelector(getUiState, (ui) => ui.accountInfoOpen);

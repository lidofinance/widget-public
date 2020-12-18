import { createSelector } from 'reselect';

export const walletSelector = (state) => state.wallet;
export const errorSelector = createSelector(
  walletSelector,
  (wallet) => wallet.error
);
export const pendingSelector = createSelector(
  walletSelector,
  (wallet) => wallet.pending
);
export const walletTypeSelector = createSelector(
  walletSelector,
  (wallet) => wallet.walletType
);
export const accountSelector = createSelector(
  walletSelector,
  (wallet) => wallet.account
);
export const providerSelector = createSelector(
  walletSelector,
  (wallet) => wallet.provider
);
export const txCostSelector = createSelector(
  walletSelector,
  (wallet) => wallet.txCost
);
export const eth2stakeSelector = createSelector(
  walletSelector,
  (wallet) => wallet.eth2stake
);
export const etherscanPageSelector = createSelector(
  walletSelector,
  (wallet) => wallet.etherscanPage
);

export function getProviderFromWindow() {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
    return provider;
  }

  if (window.web3) {
    provider = window.web3.currentProvider;
    return provider;
  }

  throw new Error('Unsupported browser extension');
}

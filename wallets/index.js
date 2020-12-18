import { ethers, utils } from 'ethers';
import {
  ACTIVE_CHAIN_ID,
  CHAINS,
  ETHERSCAN_PREFIXES,
  LIDO_CONTRACT_ADDRESS,
  SUBMIT_GAS_LIMIT,
} from '../config/constants';
import { LIDO_ABI, METAMASK_TYPE } from './constants';
import { getProviderFromWindow } from './metamask';

const GAS_LIMIT_BIGNUM = ethers.BigNumber.from(SUBMIT_GAS_LIMIT);
const GAS_PRICE_BIGNUM = ethers.BigNumber.from(1500000000); // 1.5 Gwei

export async function getProviderAsync(walletType) {
  switch (walletType) {
    case METAMASK_TYPE:
      return getProviderFromWindow();
    default:
      throw new Error('Unsupported wallet');
  }
}

export async function resetAsync(web3Provider) {
  await web3Provider.enable();
  web3Provider.disconnect();
}

export function throwIfUnsupportedChain(chainId) {
  if (chainId !== ACTIVE_CHAIN_ID) {
    throw new Error(
      `This deployment of Widget only works with ${CHAINS[ACTIVE_CHAIN_ID]}`
    );
  }
}

export async function getAccountAsync(web3Provider) {
  await web3Provider.enable();

  const provider = new ethers.providers.Web3Provider(web3Provider);
  const { chainId } = await provider.getNetwork();

  throwIfUnsupportedChain(chainId);

  const accounts = await provider.listAccounts();
  const address = accounts[0];
  const balanceInWei = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(balanceInWei);

  const gasPrice = await provider.getGasPrice();
  const gasEstimate = GAS_LIMIT_BIGNUM;

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const padding = ethers.BigNumber.from(String(10 ** 16)); // 0.01 ETH
  const maxStakeInWei = balanceInWei.sub(gasCostInWei).sub(padding);

  const zeroBigNum = ethers.BigNumber.from('0');
  const maxStake = maxStakeInWei.gt(zeroBigNum)
    ? ethers.utils.formatEther(maxStakeInWei)
    : '0';

  const lidoContractReadOnly = new ethers.Contract(
    LIDO_CONTRACT_ADDRESS,
    LIDO_ABI,
    provider
  );
  const stake = ethers.utils.formatEther(
    await lidoContractReadOnly.balanceOf(address)
  );
  const isConnected = true;

  return { isConnected, address, balance, maxStake, chainId, stake };
}

async function getETHinUSD() {
  const responseGql = await fetch(
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          bundle(id: "1" ) {
            ethPrice
          }
        }`,
      }),
    }
  );

  const { data } = await responseGql.json();
  const ethPriceInUsd = data.bundle.ethPrice;

  return ethPriceInUsd;
}

export async function getTxCostAsync() {
  const gasPrice = GAS_PRICE_BIGNUM;
  const gasEstimate = GAS_LIMIT_BIGNUM;

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = ethers.utils.formatEther(gasCostInWei);
  const ethPriceInUsd = await getETHinUSD();

  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

  return `$${txCost.toFixed(2)}`;
}

export function getEtherscanPage(chainId, hash) {
  return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
}

export async function stakeAsync(web3Provider, eth2stake) {
  await web3Provider.enable();

  const provider = new ethers.providers.Web3Provider(web3Provider);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(LIDO_CONTRACT_ADDRESS, LIDO_ABI, signer);
  const contractWithSigner = contract.connect(signer);

  // utils.parseEther only accepts float strings
  const eth2stakeStr =
    eth2stake % 1 === 0
      ? eth2stake.toFixed(1).toString()
      : eth2stake.toString();

  const overrides = {
    value: utils.parseEther(eth2stakeStr),
    gasLimit: GAS_LIMIT_BIGNUM,
  };

  // waiting to submit
  const transaction = await contractWithSigner.submit(
    ethers.constants.AddressZero,
    overrides
  );

  return transaction;
}

export async function waitForMiningAsync(transaction) {
  await transaction.wait();
  return transaction;
}

'use strict';

const IconService = require('icon-sdk-js').default;
const HttpProvider = IconService.HttpProvider;

const WALLET_NETWORK = 'https://sejong.net.solidwallet.io/api/v3';
const WALLET_NETWORK_MAIN = 'https://ctz.solidwallet.io/api/v3d';

const WALLET_NETWORK_d = 'https://sejong.net.solidwallet.io/api/v3d';

const provider_d = new HttpProvider(WALLET_NETWORK_d);
const provider = new HttpProvider(WALLET_NETWORK);
const provider_mainnet = new HttpProvider(WALLET_NETWORK_MAIN);

const iconService_d = new IconService(provider_d);
const iconService_d_mainnet = new IconService(provider_mainnet);

const iconService = new IconService(provider);

export const getTx = async (txHash, mainnet) => {
  try {
    console.log(txHash, mainnet);
    let res = '';
    if (mainnet) {
      res = await iconService_d_mainnet.getTrace(txHash).execute();
    } else {
      res = await iconService_d.getTrace(txHash).execute();
    }
    // const txObject = await iconService.getTransaction(txHash).execute();

    return { trace: res, txDetails: null };
  } catch (e) {
    return false;
  }
};

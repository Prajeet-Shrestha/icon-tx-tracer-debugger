"use strict";

const IconService = require("icon-sdk-js").default;
const HttpProvider = IconService.HttpProvider;

const WALLET_NETWORK_MAIN = "https://ctz.solidwallet.io/api/v3d";
const WALLET_NETWORK_SEJONG = "https://sejong.net.solidwallet.io/api/v3d";
const WALLET_NETWORK_BERLIN = "https://berlin.net.solidwallet.io/api/v3d";
const WALLET_NETWORK_LISBON = "https://lisbon.net.solidwallet.io/api/v3d";

const provider_sejong = new HttpProvider(WALLET_NETWORK_SEJONG);
const provider_mainnet = new HttpProvider(WALLET_NETWORK_MAIN);
const provider_berlin = new HttpProvider(WALLET_NETWORK_BERLIN);
const provider_lisbon = new HttpProvider(WALLET_NETWORK_LISBON);

const iconService_sejong = new IconService(provider_sejong);
const iconService_mainnet = new IconService(provider_mainnet);
const iconService_berlin = new IconService(provider_berlin);
const iconService_lisbon = new IconService(provider_lisbon);

export const getTx = async (
  txHash,
  mainnet,
  sejong,
  berlin,
  lisbon,
  custom,
  CustomServer
) => {
  try {
    console.log(txHash, mainnet, sejong, berlin, lisbon, custom, CustomServer);
    let res = "";
    if (mainnet) {
      res = await iconService_mainnet.getTrace(txHash).execute();
    } else if (sejong) {
      res = await iconService_sejong.getTrace(txHash).execute();
    } else if (berlin) {
      res = await iconService_berlin.getTrace(txHash).execute();
    } else if (lisbon) {
      res = await iconService_lisbon.getTrace(txHash).execute();
    } else if (custom) {
      if (CustomServer.length >= 1) {
        const WALLET_NETWORK_CUSTOM = CustomServer;
        const WALLET_NETWORK_CUSTOM_d = `${CustomServer}d`;
        const provider_custom = new HttpProvider(WALLET_NETWORK_CUSTOM_d);
        const iconService_d_custom = new IconService(provider_custom);
        res = await iconService_d_custom.getTrace(txHash).execute();
      } else {
        return { trace: null, txDetails: null };
      }
    }
    // const txObject = await iconService.getTransaction(txHash).execute();

    return { trace: res, txDetails: null };
  } catch (e) {
    return false;
  }
};

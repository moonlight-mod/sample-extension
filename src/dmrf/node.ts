import type { DMRFNatives, MRF } from "./types";

// TODO better type
let loaded_mrfs: MRF[] = [];

function init() {
  let scripts = moonlightNode.getConfigOption<string[]>("dmrf", "mrfScripts") ?? [];
  loaded_mrfs = scripts.map((scriptPath) => {
    const mrf = require(scriptPath);
    if (mrf.init) {
      mrf.init();
    }
    return mrf;
  })
}

async function receiveHook(msg: any): boolean {
  for(const mrf of loaded_mrfs) {
    let rejectFunction = (_: any) => {
      return false
    }

    let forwardFunction = (_: any) => {
      return true
    }

    const forwardMessage = mrf.receiveHook(msg, rejectFunction, forwardFunction)
    if (!forwardMessage) {
      return false
    }
  }
  return true;
}

function sendHook(msg: any): boolean {
  for(const mrf of loaded_mrfs) {
    let forwardFunction = (_: any) => {
      return true
    }

    const forwardMessage = mrf.sendHook(msg, forwardFunction)
    if (!forwardMessage) {
      return false
    }
  }
  return true;
}


const dmrf_exports: DMRFNatives = {
  init,
  receiveHook,
  sendHook,
};

module.exports = dmrf_exports;


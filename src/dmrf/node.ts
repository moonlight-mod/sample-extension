import type { DMRFNatives } from "./types";

// TODO better type
let loaded_modules: any[] = [];

function init() {
  let scripts = moonlightNode.getConfigOption<string[]>("dmrf", "mrfScripts") ?? [];
  loaded_modules = scripts.map((scriptPath) => {
    return require(scriptPath).filter;
  })
}

function receiveHook(msg: any): boolean {
  for(const filterFunc of loaded_modules) {
    if (filterFunc(msg)) {
      return true;
    }
  }
  return false;
}

const dmrf_exports: DMRFNatives = {
  init,
  receiveHook,
};

module.exports = dmrf_exports;


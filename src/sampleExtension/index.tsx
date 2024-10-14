import { ExtensionWebExports } from "@moonlight-mod/types";

// https://moonlight-mod.github.io/ext-dev/webpack/#patching
export const patches: ExtensionWebExports["patches"] = [
  {
    find: ",USER_SETTINGS:",
    replace: {
      match: ',USER_SETTINGS:"User Settings"',
      replacement: ',USER_SETTINGS:"hacked by sampleExtension lol"'
    }
  }
];

// https://moonlight-mod.github.io/ext-dev/webpack/#webpack-module-insertion
export const webpackModules: ExtensionWebExports["webpackModules"] = {
  entrypoint: {
    dependencies: [
      {
        ext: "sampleExtension",
        id: "someLibrary"
      }
    ],
    entrypoint: true
    // See `src/sampleExtension/webpackModules/entrypoint.ts` for the source of this module.
  },

  someLibrary: {
    entrypoint: true,
    run: (module, exports, require) => {
      const logger = moonlight.getLogger("sampleExtension/someLibrary");
      logger.info("Hello from someLibrary!");
      module.exports = "Hello from someLibrary's exports!";
    }
  }
};

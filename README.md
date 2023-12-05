# moonlight sample extension

This is a sample extension for the [moonlight](https://github.com/moonlight-mod/moonlight) Discord mod.

## Getting started

- Make sure you have [Node.js](https://nodejs.org/en) and [pnpm](https://pnpm.io) installed.
- Clone this repository.
- Setup Git submodules (`git submodule update --init`).
- Install dependencies (`pnpm i`).
- Build the project (`pnpm run build`).
  - If you'd prefer to run in watch mode, do `pnpm run dev` instead.

Now, add the following to your moonlight config:

```json
{
  "devSearchPaths": [
    "/path/to/sample-extension/dist"
  ]
}
```

where `/path/to/sample-extension` is the folder you cloned the repository into. After restarting your client, the extension will load.

## Project structure

This sample extension uses [esbuild](https://esbuild.github.io) as its build system. The two entrypoints (`index` and `node`) get loaded on the web and Node.js side respectively. Code exported from the Node.js side can be called from the web side. Each side is optional, in case you only need to run in a specific context (usually web only).

import someLibrary from "@moonlight-mod/wp/sampleExtension_someLibrary";

const logger = moonlight.getLogger("sampleExtension/entrypoint");
logger.info("Hello from entrypoint!");
logger.info("someLibrary exports:", someLibrary);

const natives = moonlight.getNatives("sampleExtension");
logger.info("node exports:", natives);

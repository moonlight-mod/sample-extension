import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import Dispatcher from "@moonlight-mod/wp/discord/Dispatcher";
import { DMRFNatives } from "../types";

const COOL = "Queueing message to be sent";
const module = spacepack.findByCode(COOL)[0].exports;

const originalSend = module.Z.sendMessage;
module.Z.sendMessage = async (...args: any[]) => {
  const message = args[1];
  //natives.sendHook(message);
  //args[1].content = args[1].content.replace('https://x.com','https://fixfx.com');
  //args[1].content = args[1].content.replace('http://x.com','http://fixfx.com');
  await natives.sendHook(message);
  args[1] = message;
  return originalSend.call(module.Z, ...args);
};

const natives: DMRFNatives = moonlight.getNatives("dmrf");

natives.init();

async function reDispatcher(event: any) {
  // set all message content in messages array
  // NOTE thank u husky
  if (event.hasOwnProperty("messages") && Array.isArray(event.messages)) {
    event.messages.forEach((message: any) => {
      if (
        message.hasOwnProperty("content") &&
        typeof message.content === "string"
      ) {
        const drop = natives.receiveHook(message);
        event.dmrf = true;
        if (!drop) Dispatcher.dispatch(event);
      }
    });
  } else if (event.type == "MESSAGE_CREATE") {
    const drop = natives.receiveHook(event.message);
    event.dmrf = true;
    if (!drop) Dispatcher.dispatch(event);
  } else {
    console.error("dmrf redispatcher got incorrect event type " + event.type);
  }
}

Dispatcher.addInterceptor((event) => {
  if (event.dmrfDispatch) return false;

  if (event.type === "LOAD_MESSAGES_SUCCESS") {
    reDispatcher(event);
    return true;
  }

  if (event.type == "MESSAGE_CREATE") {
    reDispatcher(event);
    return true;
  }

  return false;
});

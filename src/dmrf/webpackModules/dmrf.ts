import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import  Dispatcher  from "@moonlight-mod/wp/discord/Dispatcher";
import { DMRFNatives } from "../types";

const COOL = 'Queueing message to be sent';
const module = spacepack.findByCode(COOL)[0].exports;

const originalSend = module.Z.sendMessage;
module.Z.sendMessage = async (...args: any[]) => {
  // TODO change this to sendhook
  args[1].content = args[1].content.replace('https://x.com','https://fixvx.com');
  args[1].content = args[1].content.replace('http://x.com','http://fixvx.com');
  return originalSend.call(module.Z, ...args);
}

const natives: DMRFNatives = moonlight.getNatives("dmrf");

natives.init();

Dispatcher.addInterceptor((event) => {
  if (event.type === "LOAD_MESSAGES_SUCCESS") {
    // set all message content in messages array
    // NOTE thank u husky
    if (event.hasOwnProperty("messages") && Array.isArray(event.messages)) {
      event.messages.forEach((message: any) => {
        if (message.hasOwnProperty("content") && typeof message.content === "string") {
          return natives.receiveHook(message);
        }
      });
    }
  }
  if (event.type == "MESSAGE_CREATE") {
    return natives.receiveHook(event.message);
  }
  return false;
});


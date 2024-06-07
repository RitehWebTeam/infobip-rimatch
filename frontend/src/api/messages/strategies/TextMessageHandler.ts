import { MessageHandler } from "@api/messages/strategies/MessageHandler.ts";
import { MessageType } from "@/types/Message.ts";

export const TextMessageHandler: MessageHandler = {
  getMessageType: function () {
    return MessageType.TEXT;
  },
  useProcessMessage: function () {
    return (chatData) =>
      Promise.resolve({
        content: chatData.message,
        messageType: this.getMessageType(),
      });
  },
};

import { MessageHandler } from "@api/messages/strategies/MessageHandler.ts";
import { MessageType } from "@/types/Message.ts";
import { MessagesService } from "@api/messages/messages.ts";

export const ImageMessageHandler: MessageHandler = {
  getMessageType: function () {
    return MessageType.IMAGE;
  },
  useProcessMessage: function () {
    const { mutateAsync } = MessagesService.useUploadImage();

    return async (chatData, _receiverId, chatId) => {
      const { image } = chatData;

      if (!image) {
        return {
          content: "",
          messageType: this.getMessageType(),
        };
      }

      const response = await mutateAsync({ chatId, photo: image });
      return {
        content: response,
        messageType: this.getMessageType(),
      };
    };
  },
};

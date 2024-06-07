import { ChatInputValues, MessageType } from "@/types/Message.ts";
import { TextMessageHandler } from "@api/messages/strategies/TextMessageHandler.ts";
import { ImageMessageHandler } from "@api/messages/strategies/ImageMessageHandler.ts";

export interface MessageHandler {
  getMessageType: () => MessageType;
  useProcessMessage: () => (
    chatData: ChatInputValues,
    receiverId: string,
    chatId: string
  ) => Promise<{ content: string; messageType: MessageType }>;
}

// @ts-expect-error Error
export const MessageHandlerProvider: Record<MessageType, MessageHandler> = {
  [MessageType.TEXT]: TextMessageHandler,
  [MessageType.IMAGE]: ImageMessageHandler,
};

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  messageType: MessageType;
}

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VOICE = "VOICE",
  REPLY = "REPLY",
}

/**
 * Messages are processed in the order of the array.
 * This is important when sending text and an image in the same message.
 * The image should be sent first, then the text.
 */
export const SUPPORTED_MESSAGE_TYPES = [
  MessageType.IMAGE,
  MessageType.TEXT,
] as const;

export interface MessageImageUploadData {
  chatId: string;
  photo: File;
}

export interface MessageData {
  content: string;
  receiverId: string;
  chatId: string;
  messageType: MessageType;
}

export interface ChatInputValues {
  message: string;
  image: File | null;
}

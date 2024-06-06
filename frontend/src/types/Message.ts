export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export enum MessageType {
  TEXT,
  IMAGE,
  VOICE,
  REPLY
}

export interface MessageImageUploadData {
  chatId: string;
  photo: File;
}

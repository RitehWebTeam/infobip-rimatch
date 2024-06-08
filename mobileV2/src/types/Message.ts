import { Asset } from "react-native-image-picker";

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VOICE = "VOICE",
  REPLY = "REPLY",
}

export interface MessageImageUploadData {
  chatId: string;
  photo: Asset;
}

import { MessagesService } from "@api/messages/messages.ts";
import { MatchedUser } from "@/types/User";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useMemo } from "react";
import { MessageType } from "@/types/Message.ts";

interface ChatListComponentProps {
  matchedUser: MatchedUser;
}

const formatMessage = (message: string) => {
  return message.slice(0, 30) + (message.length > 30 ? "..." : "");
};

const getMessageContent = (content: string, messageType: MessageType) => {
  switch (messageType) {
    case MessageType.TEXT:
    case MessageType.REPLY:
      return content;
    case MessageType.IMAGE:
      return "Image";
    case MessageType.VOICE:
      return "Voice";
    default:
      return "";
  }
};

const ChatListComponent = ({ matchedUser }: ChatListComponentProps) => {
  const { data } = MessagesService.useGetMessages(matchedUser.chatId);
  const { timestamp, message } = useMemo(() => {
    const lastMessage = data?.content.at(0);
    if (!lastMessage) {
      return {
        timestamp: "",
        message: "",
      };
    }
    const sentByCurrentUser = lastMessage.receiverId === matchedUser.id;
    const prefix = sentByCurrentUser ? "You: " : "";
    const date = new Date(lastMessage.timestamp);
    const lastMessageContent = getMessageContent(
      lastMessage.content,
      lastMessage.messageType
    );
    return {
      timestamp: date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: `${prefix}${formatMessage(lastMessageContent)}`,
    };
  }, [data?.content]);
  return (
    <Link
      to={`./chat/${matchedUser.id}`}
      className="flex flex-row items-center justify-between h-min-10 p-4 border-b-2 border-gray-500 dark:hover:bg-gray-900 hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex gap-4 items-start">
        <div className="flex items-center justify-center rounded-full w-16 h-16 flex-shrink-0">
          <UserAvatar user={matchedUser} />
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="text-2xl font-bold">{matchedUser.firstName}</h1>
          </div>
          <div className="flex">
            <h3 className="text-gray-500">{message}</h3>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col justify-start  whitespace-nowrap">
        <h5 className="text-gray-500 ">{timestamp}</h5>
      </div>
    </Link>
  );
};

export default ChatListComponent;

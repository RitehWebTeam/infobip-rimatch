import { Message, MessageType } from "@/types/Message";
import { useMemo } from "react";
import UserAvatar from "../UserAvatar";
import { ProjectedUser } from "@/types/User";

interface ChatMessageProps {
  message: Message;
  matchedUser: ProjectedUser;
}

const ChatMessage = ({ message, matchedUser }: ChatMessageProps) => {
  const isSender = useMemo(
    () => message.receiverId === matchedUser.id,
    [message.receiverId, matchedUser.id]
  );

  const props = {
    message,
    matchedUser,
  };

  return isSender ? (
    <ChatMessageSent {...props} />
  ) : (
    <ChatMessageReceived {...props} />
  );
};

const ChatMessageSent = ({ message }: ChatMessageProps) => {
  // const timestamp = useMemo(() => {
  //   const date = new Date(message.timestamp);
  //   return `${date.getHours()}:${date.getMinutes()}`;
  // }, [message.timestamp]);
  return (
    <div className="flex flex-col items-end mr-2 mt-2 ml-12">
      <p className="text-white text-sm bg-red-500 py-2 px-4 rounded-xl">
        <ChatMessageContent message={message} />
      </p>
    </div>
  );
};

const ChatMessageReceived = ({ matchedUser, message }: ChatMessageProps) => {
  return (
    <div className="flex my-2 gap-2">
      <div className="flex justify-center w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
        <UserAvatar user={matchedUser} />
      </div>
      <div className="flex flex-col mr-12">
        <h3 className="text-sm font-medium ">{matchedUser.firstName}</h3>
        <p className="text-sm border border-[#E8E6EA] dark:border-[#3f3d3d] dark:bg-[#3f3d3d] dark:text-white p-2 px-4 rounded-xl">
          <ChatMessageContent message={message} />
        </p>
      </div>
    </div>
  );
};

const ChatMessageContent = ({
  message,
}: Omit<ChatMessageProps, "matchedUser">) => {
  switch (message.messageType) {
    case MessageType.TEXT:
      return <>{message.content}</>;
    case MessageType.IMAGE:
      return (
        <img src={message.content} alt="chat image" className="rounded-md" />
      );
    default:
      return null;
  }
};

export default ChatMessage;

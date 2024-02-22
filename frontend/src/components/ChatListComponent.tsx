import { MessagesService } from "@/api/messages";
import { MatchedUser } from "@/types/User";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useMemo } from "react";

interface ChatListComponentProps {
  matchedUser: MatchedUser;
}

const ChatListComponent = ({ matchedUser }: ChatListComponentProps) => {
  const { data } = MessagesService.useGetMessages(matchedUser.chatId);
  const timestamp = useMemo(() => {
    const timestamp = data?.content.at(0)?.timestamp;
    if (timestamp) {
      const date = new Date(timestamp);
      // retunt hh:mm
      return date.toLocaleTimeString().slice(0, 5);
    }
    return "";
  }, [data?.content]);
  return (
    <Link
      to="./chat"
      state={{ user: matchedUser }}
      className="flex flex-row items-center justify-between h-min-10 p-4 border-b-2 border-gray-500 dark:hover:bg-gray-900 hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex gap-4 items-start">
        <div className="flex items-center justify-center rounded-full w-16 h-16">
          <UserAvatar user={matchedUser} />
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="text-2xl font-bold">{matchedUser.firstName}</h1>
          </div>
          <div className="flex">
            <h3 className="text-gray-500">{data?.content.at(0)?.content}</h3>
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

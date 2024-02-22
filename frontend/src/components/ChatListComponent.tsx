import { MessagesService } from "@/api/messages";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { MatchedUser } from "@/types/User";
import { Link } from "react-router-dom";

interface ChatListComponentProps {
  matchedUser: MatchedUser;
}

const ChatListComponent = ({ matchedUser }: ChatListComponentProps) => {
  const currentUser = useCurrentUserContext();
  MessagesService.useSubscribeToMessages(matchedUser.chatId, currentUser.id);
  const lastMessage = "Last message";
  const time = "12:00";
  const numberOfMessages = 2;
  return (
    <Link
      to="./chat"
      state={{ user: matchedUser }}
      className="flex flex-row items-center justify-between h-min-10 p-4 border-b-2 border-gray-500 dark:hover:bg-gray-900 hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center rounded-full">
          <img
            srcSet={matchedUser.profileImageUrl}
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col ">
          <div>
            <h1 className="text-2xl font-bold">{matchedUser.firstName}</h1>
          </div>
          <div className="flex">
            <h3 className="text-gray-500">{lastMessage}</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center  whitespace-nowrap">
        <h5 className="text-gray-500 ">{time}</h5>
        <div className="flex items-center justify-center w-8 h-8 bg-red-400 rounded-full">
          <h1 className="text-white">{numberOfMessages}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ChatListComponent;

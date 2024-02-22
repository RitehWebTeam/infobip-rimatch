import { ProjectedUser } from "@/types/User";
import UserAvatar from "./UserAvatar";

interface ChatMessageProps {
  text: string;
  user: ProjectedUser;
}

const ChatMessage = ({ text, user }: ChatMessageProps) => {
  return (
    <div className="flex my-2 gap-2">
      <div className="flex justify-center w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
        <UserAvatar user={user} />
      </div>
      <div className="flex flex-col mr-12">
        <h3 className="text-sm font-medium ">{user.firstName}</h3>
        <p className="text-sm border border-[#E8E6EA] dark:border-[#3f3d3d] dark:bg-[#3f3d3d] dark:text-white p-2 px-4 rounded-xl">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

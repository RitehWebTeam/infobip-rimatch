import { ProjectedUser } from "@/types/User";

interface ChatMessageProps {
  text: string;
  user: ProjectedUser;
}

const ChatMessage = ({ text, user }: ChatMessageProps): JSX.Element => {
  return (
    <div className="items-end">
      {" "}
      <div className="flex  my-2">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
          <img srcSet={user.profileImageUrl} loading="lazy" />
        </div>
        <div className="flex flex-col ml-2">
          <h3 className="text-sm font-medium ">{user.firstName}</h3>
          <p className="text-sm bg-[#3f3d3d] dark:text-white text-white p-3 rounded-xl">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

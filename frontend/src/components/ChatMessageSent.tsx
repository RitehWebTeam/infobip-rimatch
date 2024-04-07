import { ProjectedUser } from "@/types/User";
import { Message } from "@/types/Message";

interface ChatMessageProps {
  message: Message;
  user: ProjectedUser;
}

const ChatMessage = ({ message }: ChatMessageProps): JSX.Element => {
  // const timestamp = useMemo(() => {
  //   const date = new Date(message.timestamp);
  //   return `${date.getHours()}:${date.getMinutes()}`;
  // }, [message.timestamp]);
  return (
    <div className="flex flex-col items-end mr-2 mt-2 ml-12">
      <p className="text-white text-sm bg-red-500 py-2 px-4 rounded-xl">
        {message.content}
      </p>
    </div>
  );
};

export default ChatMessage;

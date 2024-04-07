interface ChatMessageProps {
  text: string;
  username: string;
}

const ChatMessage = ({ text, username }: ChatMessageProps): JSX.Element => {
  return (
    <div className="items-end">
      {" "}
      <div className="flex  my-2">
        <div className="flex flex-col items-end mr-2">
          <h3 className="text-sm font-medium ">{username}</h3>
          <p className="text-sm bg-red-500 p-3 rounded-xl">{text}</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-red-300 rounded-full">
          <img src="./User_pfp.svg" />
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

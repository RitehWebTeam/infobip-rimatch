interface ChatMessageProps {
  text: string;
  username: string;
}

const ChatMessage = ({ text, username }: ChatMessageProps): JSX.Element => {
  return (
    <div className="items-end">
      {" "}
      <div className="flex  my-2">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
          <img src="./User_pfp.svg" />
        </div>
        <div className="flex flex-col ml-2">
          <h3 className="text-sm font-medium">{username}</h3>
          <p className="text-sm bg-[#3f3d3d] p-3 rounded-xl">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

interface ChatListComponentProps {
  username: string;
  lastMessage: string;
  time: string;
  numberOfMessages: number;
  picture: string;
}

const ChatListComponent = ({
  username,
  lastMessage,
  time,
  numberOfMessages,
  picture,
}: ChatListComponentProps) => {
  return (
    <div className="flex flex-col space-y-4 justify-between ">
      <div className="flex flex-row items-center justify-between  h-min-10 p-4 border-y-2 border-gray-500 dark:hover:bg-gray-900 hover:bg-gray-200 cursor-pointer">
        <div className="flex flex-row">
          <div className="flex items-center justify-center bg-gray-300 rounded-full">
            <img src={picture} className="w-24 h-22 rounded-full" />
          </div>
          <div className="flex flex-row w-full items-center ml-4">
            <div className="flex flex-col ">
              <div>
                <h1 className="text-2xl font-bold">{username}</h1>
              </div>
              <div className="flex">
                <h3 className="text-gray-500">{lastMessage}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center  whitespace-nowrap">
          <h5 className="text-gray-500 ">{time}</h5>
          <div className="flex items-center justify-center w-8 h-8 bg-red-400 rounded-full">
            <h1 className="text-white">{numberOfMessages}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListComponent;
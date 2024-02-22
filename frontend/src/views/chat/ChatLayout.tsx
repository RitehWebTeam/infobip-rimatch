import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <div className="flex flex-col items-center w-full flex-grow sm:min-h-fit sm:max-h-[65vh] justify-start md:pb-8">
      <Outlet />
    </div>
  );
};

export default ChatLayout;

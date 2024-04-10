import { MessagesService } from "@/api/messages";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUserContext();
  MessagesService.useSubscribeToMessages(currentUser.id);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    };
  }, []);
  return (
    <div className="flex flex-col items-center w-full flex-grow sm:min-h-fit sm:max-h-[65vh] justify-start md:pb-8">
      <Outlet />
    </div>
  );
};

export default ChatLayout;

import ChatListComponent from "@/components/ChatListComponent";
import { CircularProgress } from "@mui/material";
import * as MessagesCard from "@/components/GenericCard";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { MessagesService } from "@api/messages/messages.ts";
import { MatchesService } from "@/api/matches";

const ListOfMatchesForChatPage = () => {
  const query = MatchesService.useGetMatches();
  const [parent] = useAutoAnimate();
  const currentUser = useCurrentUserContext();
  MessagesService.useSubscribeToMessages(currentUser.id);

  if (query.isLoading) {
    return (
      <MessagesHeader>
        <div className="flex justify-center items-center h-full w-full text-red-500">
          <CircularProgress size="3rem" color="inherit" />
        </div>
      </MessagesHeader>
    );
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error</div>;
  }

  return (
    <MessagesHeader>
      <div ref={parent} className="flex flex-col px-4 w-full">
        {query.data.map((user) => (
          <ChatListComponent key={user.id} matchedUser={user} />
        ))}
      </div>
    </MessagesHeader>
  );
};

const MessagesHeader = ({ children }: { children: React.ReactNode }) => (
  <MessagesCard.Root>
    <MessagesCard.Header title="Messages" />
    {children}
  </MessagesCard.Root>
);

export default ListOfMatchesForChatPage;

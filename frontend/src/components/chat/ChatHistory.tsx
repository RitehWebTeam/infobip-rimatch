import { MessagesService } from "@api/messages/messages.ts";
import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { MatchedUser } from "@/types/User";
import { CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";

interface ChatHistoryProps {
  lastMessageId: string;
  chatId: string;
  matchedUser: MatchedUser;
}

const ChatHistory = ({
  lastMessageId,
  chatId,
  matchedUser,
}: ChatHistoryProps) => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = MessagesService.useGetMessagesHistory(chatId, lastMessageId);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full text-red-500 py-2">
        <CircularProgress size="1.5rem" color="inherit" />
      </div>
    );
  }

  if (isError || !isSuccess) {
    return <div>Error...</div>;
  }
  return (
    <>
      {data.pages.map((page) => (
        <React.Fragment key={page.number}>
          {page.content.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              matchedUser={matchedUser}
            />
          ))}
        </React.Fragment>
      ))}
      <div
        ref={ref}
        className="flex justify-center items-center w-full text-red-500 py-2 text-sm"
      >
        {isFetchingNextPage && (
          <CircularProgress size="1.5rem" color="inherit" />
        )}
        {!hasNextPage && "No more messages"}
      </div>
    </>
  );
};

export default ChatHistory;

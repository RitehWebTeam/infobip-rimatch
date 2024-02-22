import { MessagesService } from "@/api/messages";
import React from "react";
import ChatMessage from "./ChatMessage";
import { MatchedUser } from "@/types/User";

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
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = MessagesService.useGetMessagesHistory(chatId, lastMessageId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !isSuccess) {
    return <div>Error...</div>;
  }
  return data.pages.map((page) => (
    <React.Fragment key={page.number}>
      {page.content.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          matchedUser={matchedUser}
        />
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </React.Fragment>
  ));
};

export default ChatHistory;

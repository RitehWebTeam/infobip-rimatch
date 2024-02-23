import { MessagesService } from "@/api/messages";
import UserAvatar from "@/components/UserAvatar";
import { MatchedUser, ProjectedUser } from "@/types/User";
import { FormikHelpers } from "formik";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import React from "react";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatHistory from "@/components/chat/ChatHistory";
import { CircularProgress } from "@mui/material";
import ChatInput from "@/components/chat/ChatInput";
import { useInView } from "react-intersection-observer";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const initialValues = {
  message: "",
};

type ChatValues = typeof initialValues;

const ChatPage = () => {
  const [messagesStartRef, messagesStartInView] = useInView({ delay: 500 });
  const [messagesEndRef, messagesEndInView] = useInView({ triggerOnce: true });
  const [parent] = useAutoAnimate();
  const startRef = useRef<HTMLDivElement | null>(null);
  const sendMessage = MessagesService.useSendMessage();

  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user as MatchedUser;

  const recentMessages = MessagesService.useGetMessages(user?.chatId ?? "");

  const handleSubmit = (
    values: ChatValues,
    helpers: FormikHelpers<ChatValues>
  ) => {
    sendMessage(values.message, user.id, user.chatId);
    helpers.resetForm();
  };

  const goBackToMessages = () => {
    navigate("/messages");
  };

  useEffect(() => {
    if (!user) {
      goBackToMessages();
    }
  }, [user]);

  useEffect(() => {
    if (!recentMessages.isSuccess) {
      startRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [recentMessages.isSuccess]);

  useEffect(() => {
    if (messagesStartInView && recentMessages.isSuccess) {
      startRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    messagesStartInView,
    recentMessages.data?.content,
    recentMessages.isSuccess,
  ]);

  if (!user) {
    return null;
  }

  if (recentMessages.isLoading) {
    return (
      <ChatPageHeader user={user}>
        <div className="flex justify-center items-center h-full w-full text-red-500">
          <CircularProgress size="3rem" color="inherit" />
        </div>
      </ChatPageHeader>
    );
  }

  if (recentMessages.isError || !recentMessages.isSuccess) {
    return <div>Error...</div>;
  }

  return (
    <ChatPageHeader user={user}>
      {!messagesStartInView && (
        <button
          type="button"
          onClick={() =>
            startRef?.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute right-4 bottom-[4rem] sm:bottom-[5rem] hover:bg-neutral-500/80 bg-neutral-800/90 p-2 rounded-md z-10"
        >
          <ArrowDownwardIcon />
        </button>
      )}

      <div
        ref={parent}
        className="flex flex-col-reverse overflow-y-scroll min-h-[10rem] sm:h-[60vh] flex-grow w-full px-3 py-2"
      >
        <span ref={messagesStartRef}></span>
        <div ref={startRef}></div>
        {recentMessages.data.content.map((message) => (
          <ChatMessage key={message.id} message={message} matchedUser={user} />
        ))}
        <div ref={messagesEndRef}></div>
        {!recentMessages.data.last && messagesEndInView && (
          <ChatHistory
            lastMessageId={recentMessages.data.content.at(-1)?.id ?? ""}
            chatId={user.chatId}
            matchedUser={user}
          />
        )}
      </div>
      <ChatInput<ChatValues>
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </ChatPageHeader>
  );
};

interface ChatPageHeaderProps {
  children: React.ReactNode;
  user: ProjectedUser;
}

const ChatPageHeader = ({ children, user }: ChatPageHeaderProps) => (
  <div className="bg-white dark:bg-[#343030] flex w-full flex-grow sm:w-[27rem] flex-col items-center sm:rounded-lg shadow-lg shadow-black navbar-max-h relative">
    <div className="flex w-full items-center justify-between text-2xl py-2 dark:bg-[#242121] pl-4 pr-3 sm:rounded-t-lg border-b border-[#E8E6EA] dark:border-[#554e4e]">
      <div className="flex items-center gap-6">
        <Link to=".." type="button" className="font-semibold text-4xl">
          <KeyboardArrowLeftIcon fontSize="inherit" />
        </Link>
        <div className="text-black dark:text-red-500 font-bold">
          {user.firstName}
        </div>
      </div>
      <Link
        to="/matches/profile"
        state={{ user }}
        className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full"
      >
        <UserAvatar user={user} />
      </Link>
    </div>
    {children}
  </div>
);

export default ChatPage;

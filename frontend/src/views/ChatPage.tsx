import { MessagesService } from "@/api/messages";
import ChatMessageRecived from "@/components/ChatMessageRecived";
import ChatMessageSent from "@/components/ChatMessageSent";
import UserAvatar from "@/components/UserAvatar";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { MatchedUser, ProjectedUser } from "@/types/User";
import { Form, Field, Formik, FormikHelpers } from "formik";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SendIcon from "@mui/icons-material/Send";

const chatValidation = Yup.object({
  message: Yup.string().required(),
});

const initialValues = {
  message: "",
};

type ChatValues = typeof initialValues;

const ChatPage = () => {
  const currentUser = useCurrentUserContext();
  const sendMessage = MessagesService.useSendMessage();

  const dummy = useRef<HTMLSpanElement | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state?.user as MatchedUser;
  const query = MessagesService.useGetMessages(user?.chatId ?? "");

  MessagesService.useSubscribeToMessages(user.chatId ?? "", currentUser.id);

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

  if (!user) {
    return null;
  }

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error...</div>;
  }

  return (
    <ChatPageHeader user={user}>
      <div className="flex flex-col-reverse overflow-y-scroll min-h-[10rem] sm:h-[60vh] flex-grow w-full px-3 py-2">
        {query.data.content.map((message) => {
          if (dummy.current) {
            dummy.current.scrollIntoView({ behavior: "smooth" });
          }
          if (message.receiverId === currentUser.id) {
            return (
              <div className="flex flex-col items-start" key={message.id}>
                <ChatMessageRecived text={message.content} user={user} />
              </div>
            );
          } else {
            return (
              <div className="flex flex-col items-end" key={message.id}>
                <ChatMessageSent message={message} user={currentUser} />
              </div>
            );
          }
        })}
      </div>
      <span ref={dummy}></span>
      <Formik
        initialValues={initialValues}
        validationSchema={chatValidation}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            className="flex w-full items-center p-1 dark:bg-[#242121] gap-4 pr-4 border-t border-[#E8E6EA] dark:border-[#554e4e]"
            autoComplete="off"
          >
            <Field
              type="text"
              name="message"
              id="message"
              as="textarea"
              placeholder="Write a message..."
              className="bg-white dark:bg-[#242121] w-full resize-none p-2 text-sm sm:text-base focus-visible:outline-1 focus-visible:outline-red-500 focus-visible:outline rounded-lg h-10 sm:h-14"
            />
            <button type="submit" className="text-red-500">
              <SendIcon />
            </button>
          </Form>
        )}
      </Formik>
    </ChatPageHeader>
  );
};

interface ChatPageHeaderProps {
  children: React.ReactNode;
  user: ProjectedUser;
}

const ChatPageHeader = ({ children, user }: ChatPageHeaderProps) => (
  <div className="bg-white dark:bg-[#343030] flex w-full flex-grow sm:w-[27rem] flex-col items-center sm:rounded-lg shadow-lg shadow-black navbar-max-h">
    <div className="flex w-full items-center justify-between text-2xl py-2 dark:bg-[#242121] pl-4 pr-3 sm:rounded-t-lg border-b border-[#E8E6EA] dark:border-[#554e4e]">
      <div className="flex items-center gap-6">
        <Link to=".." type="button" className="font-semibold text-4xl">
          <KeyboardArrowLeftIcon fontSize="inherit" />
        </Link>
        <div className="text-black dark:text-red-500 font-bold">
          {user.firstName}
        </div>
      </div>
      <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
        <UserAvatar user={user} />
      </div>
    </div>
    {children}
  </div>
);

export default ChatPage;

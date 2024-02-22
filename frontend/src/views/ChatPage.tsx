import { MessagesService } from "@/api/messages";
import { SentIcon } from "@/assets/SentIcon";
import ChatMessageRecived from "@/components/ChatMessageRecived";
import ChatMessageSent from "@/components/ChatMessageSent";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { MatchedUser } from "@/types/User";
import { ArrowBack } from "@mui/icons-material";
import { Form, Field, Formik, FormikHelpers } from "formik";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

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
    <div>
      <div className="flex flex-col  w-full sticky top-24 z-1  dark:bg-[#1e1e1e] bg-white ">
        <div className="flex justify-between items-center h-16 px-4 border-b-2 border-gray-300">
          <div className="flex items-center">
            <Link to="../">
              <ArrowBack />
            </Link>
          </div>

          <div className="flex items-center">
            <h1 className="text-xl font-bold">{user.firstName}</h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
              <img
                srcSet={user.profileImageUrl}
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse">
        {query.data.content.map((message) => {
          if (dummy.current) {
            dummy.current.scrollIntoView({ behavior: "smooth" });
          }
          if (message.receiverId === currentUser.id) {
            return (
              <div className="flex flex-col items-start z-0" key={message.id}>
                <ChatMessageRecived text={message.content} user={user} />
              </div>
            );
          } else {
            return (
              <div className="flex flex-col items-end " key={message.id}>
                <ChatMessageSent text={message.content} user={currentUser} />
              </div>
            );
          }
        })}
      </div>
      <span ref={dummy}></span>
      <div className="flex pb-16">
        <Formik
          initialValues={initialValues}
          validationSchema={chatValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex w-full fixed bottom-0 " autoComplete="off">
              <Field
                type="text"
                name="message"
                id="message"
                placeholder="Write a message..."
                className="w-full h-12 px-4 border-2 border-gray-300 rounded-full mr-2"
              />
              <button
                type="submit"
                className="h-12 w-12  bg-gradient-to-r from-red-400 to-pink-600 rounded-full mr-2 p-2"
              >
                <SentIcon />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChatPage;

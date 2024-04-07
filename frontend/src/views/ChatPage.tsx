import { SentIcon } from "@/assets/SentIcon";
import ChatMessageRecived from "@/components/ChatMessageRecived";
import ChatMessageSent from "@/components/ChatMessageSent";
import { ArrowBack } from "@mui/icons-material";
import { useRef, useState } from "react";

const ChatPage = () => {
  const dummy = useRef<HTMLSpanElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Dummy data
  const messages = [
    {
      text: "I received this",
      username: "Receiver",
      type: "recived",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
    {
      text: "I received this",
      username: "Receiver",
      type: "sent",
    },
  ];

  /* const scrollToView = () => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }; */

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //useEffect(scrollToView, []);
  return (
    <div>
      <div className="flex flex-col  w-full sticky top-24 z-1  dark:bg-[#1e1e1e] bg-white ">
        <div className="flex justify-between items-center h-16 px-4 border-b-2 border-gray-300">
          <div className="flex items-center">
            <button onClick={handleMenuToggle}>
              <ArrowBack />
            </button>
          </div>

          <div className="flex items-center">
            <h1 className="text-xl font-bold">Username</h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
              <img src="./Default_pfp.svg" />
            </div>
          </div>
        </div>
      </div>
      <div>
        {messages.map((message) => {
          if (dummy.current) {
            dummy.current.scrollIntoView({ behavior: "smooth" });
          }
          if (message.type === "recived") {
            return (
              <div className="flex flex-col items-start z-0" key={message.text}>
                <ChatMessageRecived
                  text={message.text}
                  username={message.username}
                />
              </div>
            );
          } else {
            return (
              <div className="flex flex-col items-end " key={message.text}>
                <ChatMessageSent
                  text={message.text}
                  username={message.username}
                />
              </div>
            );
          }
        })}
      </div>
      <span ref={dummy}></span>
      <div className="flex pb-16">
        <form className="flex w-full fixed bottom-0 ">
          <input
            type="text"
            placeholder="Write a message..."
            className="w-full h-12 px-4 border-2 border-gray-300 rounded-full mr-2"
          />
          <button
            type="submit"
            className="h-12 w-12  bg-gradient-to-r from-red-400 to-pink-600 rounded-full mr-2 p-2"
          >
            <SentIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;

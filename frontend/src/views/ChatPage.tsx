import { HamburgerMenuIcon } from "@/assets";
import { SentIcon } from "@/assets/SentIcon";
import ChatMessageRecived from "@/components/ChatMessageRecived";
import ChatMessageSent from "@/components/ChatMessageSent";
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
  const friends = [
    {
      id: 1,
      username: "Friend 1",
    },
    {
      id: 2,
      username: "Friend 2",
    },
    {
      id: 3,
      username: "Friend 3",
    },
    {
      id: 4,
      username: "Friend 4",
    },
    {
      id: 5,
      username: "Friend 5",
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
      <div
        className={`fixed top-0 z-10 right-0 h-full bg-gray-200 p-4 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Friends List</h2>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.username}</li>
          ))}
        </ul>
        <button onClick={handleMenuToggle}>close</button>
      </div>

      <div className="flex flex-col  w-full sticky top-0 z-1  bg-[#1e1e1e]">
        <div className="flex justify-between items-center h-16 px-4 border-b-2 border-gray-300">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
              <img src="./Default_pfp.svg" />
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Username</h1>
          </div>
          <div className="flex items-center">
            <button onClick={handleMenuToggle}>
              <HamburgerMenuIcon />
            </button>
          </div>
        </div>
      </div>
      {messages.map((message) => {
        if (dummy.current) {
          dummy.current.scrollIntoView({ behavior: "smooth" });
        }
        if (message.type === "recived") {
          return (
            <div className="flex flex-col items-start" key={message.text}>
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

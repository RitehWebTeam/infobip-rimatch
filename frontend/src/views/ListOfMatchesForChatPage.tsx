import ChatListComponent from "@/components/ChatListComponent";

const mockData = [
  {
    username: "John",
    lastMessage: "Hello",
    time: "12:00",
    numberOfMessages: 1,
    picture: "./Default_pfp.svg",
  },
  {
    username: "Jasmin",
    lastMessage: "hola",
    time: "14:00",
    numberOfMessages: 5,
    picture: "./Default_pfp.svg",
  },
  {
    username: "John ceena",
    lastMessage: "pa pa pa paaaa",
    time: "1:00",
    numberOfMessages: 2,
    picture: "./Default_pfp.svg",
  },
  {
    username: "John krasinski",
    lastMessage: "splendid",
    time: "2:00",
    numberOfMessages: 1,
    picture: "./Default_pfp.svg",
  },
  {
    username: "John wick",
    lastMessage: "and for dessert",
    time: "19:00",
    numberOfMessages: 1,
    picture: "./Default_pfp.svg",
  },
];

const ListOfMatchesForChatPage = () => {
  return (
    <div>
      <div className=" text-center text-4xl mb-3">Messages</div>
      {mockData.map((data) => {
        return (
          <ChatListComponent
            key={data.username}
            username={data.username}
            lastMessage={data.lastMessage}
            time={data.time}
            numberOfMessages={data.numberOfMessages}
            picture={data.picture}
          />
        );
      })}
    </div>
  );
};

export default ListOfMatchesForChatPage;

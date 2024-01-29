import MatchedUser from "./MatchedUser";

const matches = [
  // generate matches
  {
    id: 0,
    profileImageUrl: "https://randomuser.me/api/portraits/women/74.jpg",
    firstName: "Emily",
    lastName: "Smith",
    age: 25,
    location: "Rijeka",
  },
  {
    id: 1,
    profileImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    firstName: "John",
    lastName: "Doe",
    age: 30,
    location: "New York",
  },
  {
    id: 2,
    profileImageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    firstName: "Emma",
    lastName: "Johnson",
    age: 28,
    location: "London",
  },
  {
    id: 3,
    profileImageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    firstName: "Michael",
    lastName: "Brown",
    age: 35,
    location: "Los Angeles",
  },
  // {
  //   id: 4,
  //   profileImageUrl: "https://randomuser.me/api/portraits/women/88.jpg",
  //   firstName: "Sophia",
  //   lastName: "Wilson",
  //   age: 27,
  //   location: "Paris",
  // },
];

const MatchesImproved = () => {
  return (
    // <div
    //   className="flex flex-col h-full items-center bg-[#343030] shadow-xl shadow-black
    //   md:rounded-2xl py-8 px-7 md:bg-clip-border"
    // >
    //   <h2 className="text-4xl w-full text-red-500 font-bold">Matches</h2>
    //   <div className="flex flex-col items-start mt-5 w-full">
    //     {matches.map((match) => (
    //       <MatchedUser key={match.id} user={match} />
    //     ))}
    //   </div>
    // </div>
    <div className="bg-white flex w-full flex-col items-center px-10 h-full">
      <div className="flex w-full items-start gap-5">
        <div className="text-black text-4xl font-bold leading-[51px] grow shrink basis-auto mt-6">
          Matches
        </div>
      </div>
      <div className="text-black text-opacity-70 text-base leading-6 w-[295px] mt-4">
        This is a list of people who matched with you.
      </div>
      <div className="flex w-full items-center gap-3 mt-7 mb-3">
        <div className="bg-gray-200 self-stretch flex w-full shrink-0 h-px flex-col my-auto" />
      </div>
      <div className="grid grid-cols-2 w-full items-stretch gap-4 mt-3">
        {matches.map((user) => (
          <MatchedUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MatchesImproved;

import { UsersService } from "@/api/users";
import ChatListComponent from "@/components/ChatListComponent";
import { CircularProgress } from "@mui/material";

const ListOfMatchesForChatPage = () => {
  const query = UsersService.useGetMatches();

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

  const matches = query.data;

  return (
    <MessagesHeader>
      <h1 className="text-center text-4xl mb-3">Messages</h1>
      <div className="flex flex-col px-4 w-full">
        {matches.map((user) => {
          return <ChatListComponent key={user.id} user={user} />;
        })}
      </div>
    </MessagesHeader>
  );
};

const MessagesHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white dark:bg-[#343030] flex w-full flex-grow sm:w-[27rem] flex-col items-center p-4 sm:rounded-lg shadow-lg shadow-black">
    {children}
  </div>
);

export default ListOfMatchesForChatPage;

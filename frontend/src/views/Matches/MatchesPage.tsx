import { MatchesService } from "@/api/matches";
import MatchedUser from "@/components/MatchedUser";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const MatchesPage = () => {
  const query = MatchesService.useGetMatches();

  if (query.isLoading) {
    return (
      <MatchHeader>
        <div className="flex justify-center items-center h-full w-full text-red-500">
          <CircularProgress size="3rem" color="inherit" />
        </div>
      </MatchHeader>
    );
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error</div>;
  }

  const matches = query.data;

  if (matches.length === 0) {
    return (
      <MatchHeader>
        <div className="flex flex-col justify-center items-center h-full w-full text-center px-4 text-lg">
          <span>No matches yet? </span>
          <Link to="/" className="underline text-red-500">
            Check out some users.
          </Link>
        </div>
      </MatchHeader>
    );
  }

  return (
    <MatchHeader>
      <div className="grid grid-cols-2 sm:grid-cols-3 w-full gap-7 mt-3 lg:max-h-[33rem] lg:overflow-y-auto">
        {matches.map((user) => (
          <Link key={user.id} to={`./profile/${user.id}`}>
            <MatchedUser user={user} />
          </Link>
        ))}
      </div>
    </MatchHeader>
  );
};

interface MatchHeaderProps {
  children: React.ReactNode;
}

const MatchHeader = ({ children }: MatchHeaderProps) => {
  return (
    <div className="flex w-full flex-grow justify-center md:pb-8">
      <div className="bg-white dark:bg-[#343030] flex w-[40rem] flex-col h-full items-center px-10 py-7 sm:rounded-lg shadow-lg shadow-black">
        <div className="flex w-full items-start gap-5">
          <div className="text-black dark:text-red-500 text-4xl font-bold leading-[51px] grow shrink basis-auto">
            Matches
          </div>
        </div>
        <div className="text-opacity-70 text-black dark:text-white dark:text-opacity-70 w-full mt-4">
          This is a list of people who matched with you.
        </div>
        <div className="flex w-full items-center gap-3 mt-7 mb-3">
          <div className="bg-gray-200 dark:bg-gray-600 w-full h-px" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default MatchesPage;

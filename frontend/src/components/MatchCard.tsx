import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { UsersService } from "@/api/users";
import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

const PAGE_SIZE = 5;

const MatchCard = () => {
  const [lodaing, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const result = UsersService.useGetPotentailUsers(page);
  const acceptMatch = UsersService.useAcceptMatch();
  const rejectMatch = UsersService.useRejectMatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const prefetchPotential = UsersService.usePrefetchPotentialUsers(page);
  const queryClient = useQueryClient();

  const handleNextUser = (matchAccept: boolean, userId: string) => {
    setLoading(true);
    const match = matchAccept ? acceptMatch.mutate : rejectMatch.mutate;
    if (currentUserIndex === PAGE_SIZE - 3) {
      prefetchPotential();
    }
    match(
      { userId },
      {
        onSettled: () => {
          if (currentUserIndex === PAGE_SIZE - 1) {
            setPage((prev) => prev + 1);
            setCurrentUserIndex(0);
          } else {
            setCurrentUserIndex((prev) => prev + 1);
          }
          setLoading(false);
        },
      }
    );
  };

  // When the component unmounts it is necessary to invalidate the query
  // because the query is cached and it will return the same data
  // but the new component will start from index 0 of the array
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["UsersService.getPotentialUsers"],
      });
    };
  }, []);

  const user = useMemo(() => {
    if (!result.data) return undefined;
    if (result.data.length <= currentUserIndex) return undefined;
    return result.data[currentUserIndex];
  }, [currentUserIndex, result.data]);

  if (result.isLoading || result.isFetching) {
    return (
      <MatchCardContainer>
        <div className="flex justify-center items-center h-full w-full text-red-500">
          <CircularProgress size="3rem" color="inherit" />
        </div>
      </MatchCardContainer>
    );
  }

  if (result.isError || !result.isSuccess) {
    return (
      <MatchCardContainer>
        <div className="flex justify-center flex-col items-center h-full w-full text-center px-4">
          <h2 className="text-red-500 mb-2 text-3xl">Whoops.</h2>
          <span className="text-lg">
            Something went wrong, try refreshing the page
          </span>
        </div>
      </MatchCardContainer>
    );
  }

  if (result.data.length === 0 || !user) {
    return (
      <MatchCardContainer>
        <div className="flex justify-center items-center h-full w-full text-center px-4 text-lg sm:text-2xl">
          Oops! You&apos;ve swiped everyone away. Try not to look so surprised.
        </div>
      </MatchCardContainer>
    );
  }

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };
  const truncatedDescription = user.description.slice(0, 100);
  return (
    <div className="overflow-y-hidden">
      {!isProfileOpen && (
        <MatchCardContainer>
          <div className="relative  flex h-60 w-full justify-center rounded-xl bg-cover">
            <div
              className={cx(
                "absolute flex h-[200px] w-[200px] items-center justify-center rounded-full",
                {
                  "bg-pink-400": user.gender === "F",
                  "bg-blue-400": user.gender === "M",
                }
              )}
            >
              <img
                className="h-40 w-40 rounded-full"
                src={user.profileImageUrl || "/Default_pfp.svg"}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-full ">
            <h4 className="text-5xl font-bold text-navy-700 dark:text-white">
              {`${user.firstName}, ${user.age}`}
            </h4>
            <p className="font-normal text-lg dark:text-gray-200">
              {user.location}
            </p>
            <div className="flex justify-center items-center mt-4 text-gray-400">
              <p className="flex align-middle text-center text-lg overflow-hidden overflow-ellipsis">
                {truncatedDescription}
              </p>
            </div>
            <div>
              <button
                className="mt-3 text-gray-500 hover:text-gray-300 text-lg"
                onClick={() => openProfile()}
              >
                View profile
              </button>
            </div>
            <div className="flex mt-16 flex-row justify-between w-full text-white">
              <button
                className="btn mt-10 fixed bottom-10 sm:bottom-36 sm:left-[46rem] sm:mt-0 hover:bg-green-600 bg-green-500 transition-color duration-300 sm:ml-4  border-green-700 rounded-full w-24 h-24 shadow-md shadow-black"
                onClick={() => handleNextUser(true, user.id)}
                disabled={lodaing}
              >
                <CheckIcon fontSize="large" />
              </button>
              <button
                className="btn mt-10 fixed bottom-10 sm:bottom-36 sm:right-[46rem] right-3 sm:mt-0 bg-red-500 hover:bg-red-600 transition-color duration-300 rounded-full sm:mr-2 border-red-700 btn-circle w-24 h-24 shadow-md shadow-black"
                onClick={() => handleNextUser(false, user.id)}
                disabled={lodaing}
              >
                <ClearIcon fontSize="large" />
              </button>
            </div>
          </div>
        </MatchCardContainer>
      )}
      {isProfileOpen && <ProfileCard user={user} onClose={closeProfile} />}
    </div>
  );
};

interface MatchCardContainerProps {
  children?: React.ReactNode;
}

const MatchCardContainer = ({
  children,
  ...props
}: MatchCardContainerProps) => {
  return (
    <div className="flex justify-center">
      <div
        className="relative flex flex-col items-center rounded-[25px] border-[1px] border-black-200 h-[850px] sm:h-[700px] w-[450px] sm:w-[24rem] p-4 bg-white dark:bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black"
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default MatchCard;

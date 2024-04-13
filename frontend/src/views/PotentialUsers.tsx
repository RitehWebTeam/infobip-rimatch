import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import MatchCard from "@/components/MatchCard";
import ProfileCard from "@/components/ProfileCard";
import { MatchesService } from "@/api/matches";

const PAGE_SIZE = 5;

const PotentialUsers = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const result = MatchesService.useGetPotentailUsers(page);
  const acceptMatch = MatchesService.useAcceptMatch();
  const rejectMatch = MatchesService.useRejectMatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const prefetchPotential = MatchesService.usePrefetchPotentialUsers(page);
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
        queryKey: ["MatchesService.getPotentialUsers"],
      });
    };
  }, [queryClient]);

  const user = useMemo(() => {
    if (!result.data) return undefined;
    if (result.data.length <= currentUserIndex) return undefined;
    return result.data[currentUserIndex];
  }, [currentUserIndex, result.data]);

  if (result.isLoading || result.isFetching) {
    return (
      <PotentialUsersContainer>
        <div className="flex justify-center items-center h-full w-full text-red-500">
          <CircularProgress size="3rem" color="inherit" />
        </div>
      </PotentialUsersContainer>
    );
  }

  if (result.isError || !result.isSuccess) {
    return (
      <PotentialUsersContainer>
        <div className="flex justify-center flex-col items-center h-full w-full text-center px-4">
          <h2 className="text-red-500 mb-2 text-3xl">Whoops.</h2>
          <span className="text-lg">
            Something went wrong, try refreshing the page
          </span>
        </div>
      </PotentialUsersContainer>
    );
  }

  if (result.data.length === 0 || !user) {
    return (
      <PotentialUsersContainer>
        <div className="flex justify-center items-center h-full w-full text-center px-4 text-lg sm:text-2xl">
          No more users? Impossible! Maybe they&apos;re just hiding...
        </div>
      </PotentialUsersContainer>
    );
  }

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      {!isProfileOpen && (
        <PotentialUsersContainer>
          <MatchCard
            user={user}
            handleNextUser={handleNextUser}
            openDetailedProfile={openProfile}
            loading={loading}
          />
        </PotentialUsersContainer>
      )}
      {isProfileOpen && (
        <div className="flex w-full flex-grow justify-center md:pb-8">
          <ProfileCard user={user} onClose={closeProfile} />
        </div>
      )}
    </>
  );
};

interface PotentialUsersContainerProps {
  children?: React.ReactNode;
}

const PotentialUsersContainer = ({
  children,
  ...props
}: PotentialUsersContainerProps) => {
  return (
    <div className="flex flex-col items-center flex-grow sm:pb-12 min-h-fit max-h-[800px] md:max-h-[700px] ">
      <div
        className="flex flex-col items-center sm:rounded-[25px] border-[1px] border-black-200 flex-grow w-full sm:w-[26rem] p-4 bg-white dark:bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black"
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default PotentialUsers;

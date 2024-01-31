import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { UsersService } from "@/api/users";
import cx from "classnames";
import { useMemo, useState } from "react";
import { ProfileCard } from "./ProfileCard";

const PAGE_SIZE = 5;

const MatchCard = () => {
  const [page, setPage] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const result = UsersService.useGetPotentailUsers(page);
  const acceptMatch = UsersService.useAcceptMatch();
  const rejectMatch = UsersService.useRejectMatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const prefetchPotential = UsersService.usePrefetchPotentialUsers(page);

  const handleNextUser = (matchAccept: boolean, userId: string) => {
    const match = matchAccept ? acceptMatch.mutate : rejectMatch.mutate;
    if (currentUserIndex === PAGE_SIZE - 3) {
      prefetchPotential();
    }
    match({ userId });
    if (currentUserIndex === PAGE_SIZE - 1) {
      setPage((prev) => prev + 1);
      setCurrentUserIndex(0);
    } else {
      setCurrentUserIndex((prev) => prev + 1);
    }
  };

  const user = useMemo(() => {
    if (!result.data) return undefined;
    if (result.data.length <= currentUserIndex) return undefined;
    return result.data[currentUserIndex];
  }, [currentUserIndex, result.data]);

  // TODO: Add loading spinner or something
  if (result.isLoading || !user || result.isFetching) {
    return null;
  }

  if (result.isError || !result.isSuccess) {
    return <div>Error: {result.error?.message}</div>;
  }

  // TODO: Nicer message when there are no more users
  if (result.data.length === 0) {
    return <div>No more users</div>;
  }

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };
  const truncatedDescription = user.description.slice(0, 100);
  return (
    <div className="flex justify-center">
      {!isProfileOpen && (
        <div className="relative flex flex-col items-center rounded-[25px] border-[1px] border-black-200 h-[580px] sm:h-[600] w-[340px] sm:w-[24rem] p-4 bg-white dark:bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black">
          <div className="relative flex h-72 w-full justify-center rounded-xl bg-cover">
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
          <div className="flex flex-col items-center w-full">
            <h4 className="text-4xl font-bold text-navy-700 dark:text-white">
              {`${user.firstName}, ${user.age}`}
            </h4>
            <p className="text-base font-normal dark:text-gray-200">
              {user.location}
            </p>
            <div className="flex justify-center items-center mt-4 text-gray-400">
              <p className="flex align-middle text-center overflow-hidden overflow-ellipsis">
                {truncatedDescription}
              </p>
            </div>
            <div>
              <button
                className="mt-3 text-gray-500 hover:text-gray-300"
                onClick={() => openProfile()}
              >
                View profile
              </button>
            </div>
            <div className="flex mt-16 flex-row justify-between w-full text-white">
              <button
                className="btn hover:bg-green-600 bg-green-500 transition-color duration-300 sm:ml-4 mb-2 border-green-700 rounded-full w-24 h-24 shadow-md shadow-black"
                onClick={() => handleNextUser(true, user.id)}
              >
                <CheckIcon fontSize="large" />
              </button>
              <button
                className="btn bg-red-500 hover:bg-red-600 transition-color duration-300 rounded-full sm:mr-2 border-red-700 btn-circle w-24 h-24 shadow-md shadow-black"
                onClick={() => handleNextUser(false, user.id)}
              >
                <ClearIcon fontSize="large" />
              </button>
            </div>
          </div>
        </div>
      )}
      {isProfileOpen && <ProfileCard user={user} onClose={closeProfile} />}
    </div>
  );
};

export default MatchCard;

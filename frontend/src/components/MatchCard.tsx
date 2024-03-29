import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import cx from "classnames";
import { ProjectedUser } from "@/types/User";
import { useMemo } from "react";


interface MatchCardProps {
  user: ProjectedUser;
  loading: boolean;
  handleNextUser: (matchAccept: boolean, userId: string) => void;
  openDetailedProfile: () => void;
}

const MatchCard = ({user, loading, handleNextUser, openDetailedProfile}: MatchCardProps) => {

  const truncatedDescription = useMemo(() => user.description.slice(0, 100), [user.description]);

  return (
    <>
      <div className="flex w-full justify-center rounded-xl mt-4 mb-6">
        <div
          className={cx(
            "flex h-[185px] w-[185px] items-center justify-center rounded-full",
            {
              "bg-pink-400": user.gender === "F",
              "bg-blue-400": user.gender === "M",
            }
          )}
        >
          <img
            className="h-44 w-44 rounded-full"
            src={user.profileImageUrl || "/Default_pfp.svg"}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full justify-between flex-grow gap-6 md:max-h-[22rem]">
        <div className="w-full flex flex-col justify-center items-center">
          <h4 className="text-5xl font-bold text-navy-700 dark:text-white">
            {`${user.firstName}, ${user.age}`}
          </h4>
          <p className="font-normal text-lg dark:text-gray-200 mt-4">
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
              onClick={openDetailedProfile}
            >
              View profile
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full text-white pb-4 px-2">
          <button
            className=" hover:bg-green-600 bg-green-500 transition-color duration-300 sm:ml-4  border-green-700 rounded-full w-24 h-24 shadow-md shadow-black"
            onClick={() => handleNextUser(true, user.id)}
            disabled={loading}
          >
            <CheckIcon fontSize="large" />
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 transition-color duration-300 rounded-full sm:mr-2 border-red-700 btn-circle w-24 h-24 shadow-md shadow-black"
            onClick={() => handleNextUser(false, user.id)}
            disabled={loading}
          >
            <ClearIcon fontSize="large" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MatchCard;

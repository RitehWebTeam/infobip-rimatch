import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { ProjectedUser } from "@/types/User";
import { useMemo } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import InfoIcon from "@mui/icons-material/Info";
interface MatchCardProps {
  user: ProjectedUser;
  loading: boolean;
  handleNextUser: (matchAccept: boolean, userId: string) => void;
  openDetailedProfile: () => void;
}

const MatchCard = ({
  user,
  loading,
  handleNextUser,
  openDetailedProfile,
}: MatchCardProps) => {
  const truncatedDescription = useMemo(() => {
    if (user.description.length > 50) {
      return user.description.slice(0, 50) + "...";
    }
    return user.description;
  }, [user.description]);

  return (
    <>
      <div
        className="flex flex-col justify-end gap-2 rounded-xl relative bg-cover w-[95%] sm:w-[90%]
        min-h-[60vh] sm:min-h-[32rem] mb-4 flex-grow"
        style={{ backgroundImage: `url(${user.profileImageUrl}}` }}
      >
        <div className="absolute h-full w-full bg-gradient-to-t rounded-xl from-black from-0% to-40%"></div>
        <div className="top-5 left-4 absolute flex items-center justify-center gap-1 bg-gray-500/30 p-2 rounded-lg text-sm text-white">
          <LocationOnIcon color="inherit" fontSize="inherit" />
          <span>{user.location}</span>
        </div>
        <div className="flex z-10 items-center gap-2 px-5 pb-4 text-white cursor-pointer" onClick={openDetailedProfile}>
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-bold text-2xl">
              {user.firstName}, {user.age}
            </h2>
            <p className="m-0 text-sm text-gray-300">
              {truncatedDescription}
            </p>
          </div>
          <InfoIcon />
        </div>
      </div>
      <div className="flex flex-col items-center w-full justify-center flex-grow">
        <div className="flex justify-between w-full text-white px-6 sm:p-6">
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

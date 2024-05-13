import { useMemo, useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import HeartIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { motion, useMotionValue, useTransform } from "framer-motion";
import cx from "classnames";

interface MatchCardProps {
  user: {
    id: string;
    firstName: string;
    age: number;
    description: string;
    profileImageUrl: string;
    location: string;
  };
  loading: boolean;
  handleNextUser: (matchAccept: boolean, userId: string) => void;
  openDetailedProfile: () => void;
}

const DRAG_TRESHOLD = 2;

const MatchCard = ({
  user,
  loading,
  handleNextUser,
  openDetailedProfile,
}: MatchCardProps) => {
  const [dragValue, setDragValue] = useState(0);
  const [showHeartIcon, setShowHeartIcon] = useState(false);
  const [showRedXIcon, setShowRedXIcon] = useState(false);
  const truncatedDescription = useMemo(() => {
    if (user.description.length > 50) {
      return user.description.slice(0, 50) + "...";
    }
    return user.description;
  }, [user.description]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-10, 0, 10], [-30, 0, 30]);
  const handleDragEnd = () => {
    const dragValue = x.get();
    if (Math.abs(dragValue) < DRAG_TRESHOLD) {
      x.set(0);
      setDragValue(0);
      return;
    }

    if (dragValue < 0 && Math.abs(dragValue) > DRAG_TRESHOLD) {
      handleNextUser(false, user.id);
      setShowHeartIcon(true);
      setShowRedXIcon(false);
    } else {
      handleNextUser(true, user.id);
      setShowHeartIcon(false);
      setShowRedXIcon(true);
    }

    setDragValue(0);
    x.set(0);
  };

  useEffect(() => {
    if (showHeartIcon || showRedXIcon) {
      const timer = setTimeout(() => {
        setShowHeartIcon(false);
        setShowRedXIcon(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  });

  return (
    <>
      <motion.div
        className={cx(
          "flex flex-col items-center w-full justify-center flex-grow",
          {
            "/* Heart appearing */": dragValue > DRAG_TRESHOLD,
            "/* X appearing */": dragValue < -DRAG_TRESHOLD,
          }
        )}
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.01}
        onDrag={() => setDragValue(x.get())}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex flex-col justify-end gap-2 rounded-xl relative bg-cover bg-center w-[95%] sm:w-[90%]
        min-h-[60vh] sm:min-h-[32rem] mb-4 flex-grow"
          style={{ backgroundImage: `url(${user.profileImageUrl})` }}
        >
          <div className="absolute h-full w-full bg-gradient-to-t rounded-xl from-black from-0% to-40%"></div>
          <div className="top-5 left-4 absolute flex items-center justify-center gap-1 bg-gray-500/60 p-2 rounded-lg text-sm text-white">
            <LocationOnIcon color="inherit" fontSize="inherit" />
            <span>{user.location}</span>
          </div>
          <div
            className="flex z-10 items-center gap-2 px-5 pb-4 text-white cursor-pointer w-full justify-between"
            onClick={openDetailedProfile}
          >
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

        {dragValue > DRAG_TRESHOLD && (
          <div className="fixed inset-0 flex items-center justify-center z-80">
            <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center opacity-60">
              <ClearIcon
                sx={{ fontSize: "5rem", color: "red", opacity: 0.4 }}
              />
            </div>
          </div>
        )}
        {dragValue < -DRAG_TRESHOLD && (
          <div className="fixed inset-0 flex items-center justify-center z-80">
            <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center opacity-60">
              <HeartIcon
                sx={{ fontSize: "5rem", color: "red", opacity: 0.4 }}
              />
            </div>
          </div>
        )}
      </motion.div>
      <div className="flex flex-col items-center w-full justify-center flex-grow">
        <div className="flex justify-between w-full text-white px-6 sm:p-6">
          <button
            className="hover:bg-green-600 bg-green-500 transition-color duration-300 sm:ml-4 border-green-700 rounded-full w-24 h-24 shadow-md shadow-black"
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
      {showHeartIcon && (
        <div className="fixed inset-0 flex items-center justify-center z-80">
          <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center opacity-7">
            <HeartIcon sx={{ fontSize: "5rem", color: "red", opacity: 0.4 }} />
          </div>
        </div>
      )}
      {showRedXIcon && (
        <div className="fixed inset-0 flex items-center justify-center z-80">
          <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center opacity-7">
            <ClearIcon sx={{ fontSize: "5rem", color: "red", opacity: 0.4 }} />
          </div>
        </div>
      )}
    </>
  );
};

export default MatchCard;

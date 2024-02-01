import React from "react";
import cx from "classnames";
import { ProjectedUser } from "@/types/User";

type ProfileCardProps = {
  user: ProjectedUser;
  onClose: () => void;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClose }) => {
  return (
    <div className="flex justify-center items-center overflow-y-hidden">
      <div className="relative flex flex-col items-center  rounded-[25px] border-[1px] border-black-200 h-[1100px] sm:h-[700px] w-[550px] p-4 dark:bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black">
        <div className="relative flex h-72 w-full justify-center rounded-xl bg-cover">
          <div
            className={cx(
              "absolute flex h-[250px] w-[250px] items-center justify-center rounded-full",
              {
                "bg-pink-400": user.gender === "F",
                "bg-blue-400": user.gender === "M",
              }
            )}
          >
            <img
              className="w-full object-cover rounded-full"
              src={user.profileImageUrl || "/Default_pfp.svg"}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col  items-center w-full ">
          <h4 className="text-4xl font-bold text-navy-700 dark:text-white lin text-center">{`${user.firstName} ${user.lastName}, ${user.age} ${user.gender}`}</h4>

          <div className="mt-1 border-t border-gray-500 w-full flex justify-center">
            <p className="text-xl dark:text-gray-200">
              Lives in: {user.location}
            </p>
          </div>
          <div className="mt-1">
            <p className="text-2xl font-bold">About {`${user.firstName}`}</p>
          </div>
          <div className="flex justify-center items-center mt-1 text-gray-400">
            <p className="flex align-middle text-center text-lg sm:text-xl text-gray-300 ">
              {user.description}
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <p className=" text-lg text-gray-300">Favorite song:</p>
            <p className=" text-lg text-gray-300">{user.favouriteSong}</p>
          </div>
          <div className="fixed bottom-16 sm:bottom-44 w-full flex flex-col items-center">
            <p className="mt-4 border-t border-gray-500  text-center">TAGS</p>
            <div className="mt-1">{user.tags.map((tag) => `#${tag}`)}</div>
          </div>

          <button
            className=" fixed bottom-0 sm:bottom-28 mb-7  text-gray-500 hover:text-gray-300"
            onClick={onClose}
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

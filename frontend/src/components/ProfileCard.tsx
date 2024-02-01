import React from "react";
import cx from "classnames";
import { ProjectedUser } from "@/types/User";

type ProfileCardProps = {
  user: ProjectedUser;
  onClose: () => void;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClose }) => {
  return (
    <div className="flex flex-col items-center flex-grow sm:pb-8">
      <div className="flex flex-col items-center rounded-[25px] border-[1px] border-black-200 flex-grow sm:h-[700px] max-h-[50rem] w-full sm:w-[550px] p-4 dark:bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black">
        <div className="flex w-full justify-center rounded-xl mt-4 mb-6">
          <div
            className={cx(
              "flex h-[215px] w-[215px] items-center justify-center rounded-full",
              {
                "bg-pink-400": user.gender === "F",
                "bg-blue-400": user.gender === "M",
              }
            )}
          >
            <img
              className="h-52 w-52 rounded-full"
              src={user.profileImageUrl || "/Default_pfp.svg"}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-full justify-around flex-grow min-h-fit">
          <div className="w-full flex flex-col justify-center items-center">
            <h4 className="text-4xl font-bold text-navy-700 dark:text-white text-center">{`${user.firstName} ${user.lastName}, ${user.age} ${user.gender}`}</h4>
            <div className="mt-1 pt-4 border-t border-gray-500 w-full flex justify-center md:w-3/4">
              <p className="text-xl dark:text-gray-200">
                Lives in: {user.location}
              </p>
            </div>
            <p className="text-3xl font-bold mt-4">
              About {`${user.firstName}`}
            </p>
            <div className="flex justify-center items-center mt-1 text-gray-400">
              <p className="flex align-middle text-center text-lg sm:text-xl text-gray-300 ">
                {user.description}
              </p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <p className=" text-lg text-gray-300">Favorite song:</p>
              <p className=" text-lg text-gray-300">{user.favouriteSong}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full flex flex-col items-center">
              <p className="mt-4 border-t border-gray-500  text-center">TAGS</p>
              <div className="mt-1">{user.tags.map((tag) => `#${tag}`)}</div>
            </div>
            <button
              className="mb-7 text-gray-500 hover:text-gray-300"
              onClick={onClose}
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

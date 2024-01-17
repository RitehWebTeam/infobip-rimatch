import React from "react";
import cx from "classnames";

type ProfileCardProps = {
  user: {
    firstName: string;
    age: number;
    description: string;
    lastName: string;
    location: string;
    profileImageUrl: string;
    gender: string;
    // Add other user-specific properties here
  };
  onClose: () => void;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClose }) => {
  // Customize the content and appearance of the expanded profile card
  return (
    <div className="  bg-gray-800 bg-opacity-70 flex justify-center items-center">
      <div className="relative top-7 flex flex-col items-center rounded-[25px] border-[1px] border-black-200 h-[750px] sm:h-[700px] w-[550px] p-4 bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black">
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
              className="h-45 w-45 rounded-full"
              src={user.profileImageUrl || "/Default_pfp.svg"}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col  items-center w-full ">
          <h4 className="text-4xl font-bold text-navy-700 dark:text-white lin">{`${user.firstName} ${user.lastName}, ${user.age} ${user.gender}`}</h4>

          <div className="mt-4 border-t border-gray-500 w-full flex justify-center">
            <p className="text-xl text-gray-200">Lives in: {user.location}</p>
          </div>
          <div className="mt-4">
            <p className="text-2xl">About {`${user.firstName}`}</p>
          </div>
          <div className="flex justify-center items-center mt-1 text-gray-400">
            <p className="flex align-middle text-center text-lg sm:text-xl ">
              {user.description}
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <p className=" text-lg text-gray-400">Favorite song:</p>
            <p className=" text-lg text-gray-400">Despacito</p>
          </div>
          <div className=" absolute bottom-16">
            <p className="mt-4 border-t border-gray-500  w-full flex justify-center">
              TAGS
            </p>
            <div>
              <p className="mt-1">#travel #love #life</p>
            </div>
          </div>

          <button
            className=" absolute bottom-0 mb-7  text-gray-500 hover:text-gray-300"
            onClick={onClose}
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

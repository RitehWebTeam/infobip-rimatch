import useCurrentUserContext from "@/hooks/useCurrentUser";
import { NavLink, Outlet } from "react-router-dom";
import cx from "classnames";

const UserPageLayout = () => {
  const user = useCurrentUserContext();
  return (
    <div className="flex w-full flex-grow justify-center md:pb-8">
      <div className="bg-white  dark:bg-[#343030] flex w-full sm:w-[27rem] flex-col h-full items-center sm:rounded-lg sm:shadow-lg shadow-black">
        <div className="w-full sm:rounded-t-lg bg-[#f3f4f6] dark:bg-[#1e1e1e] flex-grow">
          <img
            srcSet={user.profileImageUrl || "/Default_pfp.svg"}
            className="w-full object-cover md:object-contain max-h-[33rem] md:max-h-[26rem] sm:rounded-t-lg"
          />
        </div>
        <div className="bg-white dark:bg-[#343030] h-full w-full mt-[-2rem] rounded-t-3xl rounded-lg  px-8 pt-6 pb-10">
          <h2 className="text-3xl font-bold dark:text-red-500 mb-5">
            {user.firstName} {user.lastName}
          </h2>
          <div className="pl-3 flex gap-8 items-center w-full mb-5">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                cx({ "border-b-2 border-red-500": isActive })
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="preferences"
              className={({ isActive }) =>
                cx({ "border-b-2 border-red-500": isActive })
              }
            >
              Preferences
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPageLayout;

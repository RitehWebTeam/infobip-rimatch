import { useState } from "react";
import { RiMatchLogo, CogIcon, HeartIcon, LogoutIcon } from "@/assets";
import useLogout from "@/hooks/useLogout";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Link } from "react-router-dom";
import MatchIcon from "@/assets/MatchIcon";

const Navbar: React.FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = useLogout();
  const user = useCurrentUserContext();

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="flex items-center justify-between sticky top-0 Z-10   px-5 py-6 w-full border-b border-gray-300 dark:border-gray-700  sm:mb-8d dark:bg-[#1e1e1e] bg-white">
      <div>
        <RiMatchLogo />
      </div>
      <Link
        to="/"
        className="text-red-500 text-4xl sm:absolute sm:w-52 sm:left-0 sm:right-0 sm:mr-auto sm:ml-auto sm:text-5xl flex justify-center font-semibold font-Pacifico"
      >
        RiMatch
      </Link>
      <div className="flex gap-3 items-center">
        <p className="hidden sm:block text-2xl font-Montserrat">
          {user.firstName}
        </p>

        <div
          onClick={handleOpenDropdown}
          className="h-12 w-12 md:h-14 md:w-14 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center "
          style={{
            backgroundImage: `url(${
              user.profileImageUrl || "/Default_pfp.svg"
            })`,
          }}
        >
          {isDropdownOpen && (
            <div className="drop-down w-48 overflow-hidden text-black bg-white dark:bg-[#3b3a3a] dark:text-white rounded-md shadow absolute z-10 top-12 right-3">
              <Link
                to="/user/profile"
                className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-200  dark:hover:bg-slate-400"
              >
                <CogIcon /> <span>Profile</span>
              </Link>
              <Link
                to="/matches"
                className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
              >
                <MatchIcon />
                <span>My Matches</span>
              </Link>
              <Link
                to="/user/preferences"
                className="px-3  py-3  text-sm font-medium flex items-center space-x-2 hover:bg-slate-200 dark:hover:bg-slate-400"
              >
                <HeartIcon />
                <span> Preferences </span>
              </Link>
              <div
                onClick={() => logout()}
                className="px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-200  dark:hover:bg-slate-400"
              >
                <span>
                  <LogoutIcon />
                </span>
                <span> Logout </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

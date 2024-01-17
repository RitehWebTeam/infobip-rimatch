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
    <nav className="flex bg-[#1E1E1E] items-center relative justify-between  px-5 py-6 w-full border-b border-gray-700">
      <div>
        <RiMatchLogo />
      </div>
      <Link
        to="/"
        className="text-red-500 text-4xl sm:text-5xl ml-0 sm:ml-56 flex justify-center font-semibold font-Pacifico"
      >
        RiMatch
      </Link>
      <div className="flex gap-3 items-center">
        {!isDropdownOpen && (
          <Link
            to="/matches"
            className="pr-4 font-bold text-2xl border-r-2 sm:block hidden"
          >
            My matches
          </Link>
        )}
        <p className="hidden sm:block">{user.firstName}</p>

        <div
          onClick={handleOpenDropdown}
          className="h-12 w-12 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center "
          style={{
            backgroundImage: `url(${
              user.profileImageUrl || "/Default_pfp.svg"
            })`,
          }}
        >
          {isDropdownOpen && (
            <div className="drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute z-10 top-12 right-3">
              <ul>
                <li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                  <span>
                    <CogIcon />
                  </span>
                  <span> Profile </span>
                </li>
                <li className="px-3  py-3  text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                  <span>
                    <HeartIcon />
                  </span>
                  <span> Preferences </span>
                </li>
                <li
                  onClick={() => logout()}
                  className="px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                >
                  <span>
                    <LogoutIcon />
                  </span>
                  <span> Logout </span>
                </li>
                <li className="sm:hidden px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                  <span>
                    {" "}
                    <MatchIcon />
                  </span>
                  <span>My Matches</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import {
  RiMatchLogo,
  CogIcon,
  HeartIcon,
  LogoutIcon,
  HamburgerMenuIcon,
} from "@/assets";
import useLogout from "@/hooks/useLogout";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import cx from "classnames";

const Navbar: React.FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = useLogout();
  const user = useCurrentUserContext();

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <nav className="flex dark:bg-[#1E1E1E] items-center relative justify-between bg-white px-5 py-6 w-full border-b border-gray-700">
        <div>
          <RiMatchLogo />
        </div>
        <h1 className="text-red-500 text-5xl flex justify-center font-semibold">
          RiMatch
        </h1>
        <div className="flex gap-3 items-center">
          <p>{user.firstName}</p>

          <div
            onClick={handleOpenDropdown}
            className={cx(
              "h-12 w-12 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center",
              {
                "bg-[url(/Default_pfp.svg)]": !user.profileImageUrl,
                [`bg-[url(${user.profileImageUrl})]`]: user.profileImageUrl,
              }
            )}
          >
            {isDropdownOpen && (
              <div className="drop-down  w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
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
                </ul>
              </div>
            )}
          </div>
          <div
            onClick={handleOpenDropdown}
            className="sm:hidden cursor-pointer"
            id="mobile-toggle"
          >
            <HamburgerMenuIcon />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

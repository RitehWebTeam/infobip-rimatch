import { RiMatchLogo } from "@/assets";
import useLogout from "@/hooks/useLogout";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import UserAvatar from "./UserAvatar";
const Navbar: React.FunctionComponent = () => {
  const logout = useLogout();
  const user = useCurrentUserContext();

  return (
    <nav className="flex items-center justify-between sticky top-0 sm:mb-4 px-5 py-6 w-full border-b border-gray-300 dark:border-gray-700  sm:mb-8d dark:bg-[#1e1e1e] bg-white">
      <div>
        <RiMatchLogo />
      </div>
      <Link
        to="/"
        className="text-red-500 text-4xl sm:absolute sm:w-52 sm:left-0 sm:right-0 sm:mr-auto sm:ml-auto sm:text-5xl flex justify-center font-semibold font-Pacifico focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400"
      >
        RiMatch
      </Link>
      <div className="flex gap-6 items-center">
        <p className="hidden sm:block text-2xl font-Montserrat">
          {user.firstName}
        </p>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            asChild
            className="flex justify-center items-center focus-visible:outline-2 focus-visible:outline focus-visible:outline-slate-400 rounded-full"
          >
            <button
              type="button"
              className="h-12 w-12 md:h-14 md:w-14 hover:ring-2 ring-red-600"
            >
              <UserAvatar user={user} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-48 text-black bg-white dark:bg-[#3b3a3a] dark:text-white rounded-md"
              sideOffset={5}
              align="end"
              alignOffset={-5}
            >
              <DropdownMenu.Item
                className="px-3 py-3 text-sm font-medium  hover:bg-slate-200 dark:hover:bg-slate-600  focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md"
                asChild
              >
                <Link to="/messages" className="flex items-center gap-4">
                  <ChatIcon />
                  <span>Messages</span>
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="px-3 py-3 text-sm font-medium  hover:bg-slate-200 dark:hover:bg-slate-600  focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md"
                asChild
              >
                <Link to="/matches" className="flex items-center gap-4">
                  <PeopleAltIcon />
                  <span>My Matches</span>
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="px-3 py-3 text-sm font-medium  hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md"
                asChild
              >
                <Link to="/settings" className="flex items-center gap-4">
                  <SettingsOutlinedIcon />
                  <span>Settings</span>
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="px-3 py-3 text-sm font-medium hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md w-full"
                asChild
              >
                <button
                  type="button"
                  onClick={() => logout()}
                  className="flex items-center gap-4"
                >
                  <LogoutIcon />
                  <span> Logout </span>
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
};

export default Navbar;

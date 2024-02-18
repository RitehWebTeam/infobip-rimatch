import { RiMatchLogo } from "@/assets";
import useLogout from "@/hooks/useLogout";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar: React.FunctionComponent = () => {
  const logout = useLogout();
  const user = useCurrentUserContext();

  const userInitials = user.firstName[0] + user.lastName[0];

  return (
    <nav className="flex items-center relative justify-between  px-5 py-6 min-w-[20rem] w-full border-b border-gray-300 dark:border-gray-700 sm:mb-8">
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
            <button type="button">
              <Avatar.Root className="inline-flex items-center justify-center h-12 w-12 md:h-14 md:w-14 hover:ring-2 ring-red-400 select-none rounded-full">
                <Avatar.Image
                  src={user.profileImageUrl}
                  alt="User profile picture"
                  className="w-full h-full bg-cover bg-center rounded-full"
                />
                <Avatar.AvatarFallback
                  className="w-full h-full flex items-center justify-center text-red-500 bg-gray-100 rounded-full border-2 border-red-500"
                  delayMs={600}
                >
                  {userInitials}
                </Avatar.AvatarFallback>
              </Avatar.Root>
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
                className="px-3 py-3 text-sm font-medium  hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md"
                asChild
              >
                <Link to="/user/profile" className="flex items-center gap-4">
                  <SettingsOutlinedIcon />
                  <span>Profile</span>
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
                className="px-3  py-3  text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md"
                asChild
              >
                <Link
                  to="/user/preferences"
                  className="flex items-center gap-4"
                >
                  <FavoriteBorderIcon />
                  <span> Preferences </span>
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

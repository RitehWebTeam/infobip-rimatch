import PaletteIcon from "@mui/icons-material/Palette";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import * as SettingsCard from "@/components/SettingsCard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";

const SettingsList = () => {
  return (
    <SettingsCard.Root>
      <SettingsCard.Header title="Settings" />
      <div className="flex flex-col w-full gap-2">
        <Link
          to="./profile"
          className="px-2 py-2 text-sm font-medium hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md w-full"
        >
          <button type="button" className="flex items-center gap-4">
            <AccountBoxIcon />
            <span> User Settings </span>
          </button>
        </Link>
        <Link
          to="./picture"
          className="px-2 py-2 text-sm font-medium hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md w-full"
        >
          <button type="button" className="flex items-center gap-4">
            <CameraAltIcon />
            <span> Profile picture </span>
          </button>
        </Link>
        <Link
          to="./preferences"
          className="px-2 py-2 text-sm font-medium hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md w-full"
        >
          <button type="button" className="flex items-center gap-4">
            <FavoriteBorderIcon />
            <span> Preferences </span>
          </button>
        </Link>
        <Link
          to="./theme"
          className="px-2 py-2 text-sm font-medium hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md w-full"
        >
          <button type="button" className="flex items-center gap-4">
            <PaletteIcon />
            <span> Theme </span>
          </button>
        </Link>

        <Link
          to="./gallery"
          className="px-2 py-2 text-sm font-medium hover:bg-slate-200  dark:hover:bg-slate-600 focus-visible:outline-1 focus-visible:outline focus-visible:outline-slate-400 rounded-md w-full"
        >
          <button type="button" className="flex items-center gap-4">
            <CollectionsIcon />
            <span> Gallery </span>
          </button>
        </Link>
      </div>
    </SettingsCard.Root>
  );
};

export default SettingsList;

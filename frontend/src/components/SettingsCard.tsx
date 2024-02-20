import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";

interface SettingsCardProps {
  children?: React.ReactNode;
}

interface SettingsCardHeaderProps {
  children?: React.ReactNode;
  title: string;
}

export const Header = ({ children, title }: SettingsCardHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between text-2xl mb-4">
      <div className="flex items-center text-2xl gap-6">
        <Link to=".." type="button" className="font-semibold">
          <KeyboardArrowLeftIcon fontSize="large" />
        </Link>
        <div className="text-black dark:text-red-500 font-bold">{title}</div>
      </div>
      {children}
    </div>
  );
};

export const Root = ({ children }: SettingsCardProps) => {
  return (
    <div className="bg-white dark:bg-[#343030] flex w-full flex-grow sm:w-[27rem] flex-col items-center p-4 sm:rounded-lg shadow-lg shadow-black">
      {children}
    </div>
  );
};

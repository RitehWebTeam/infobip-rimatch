import { Outlet } from "react-router-dom";

const SettingsLayout = () => {
  return (
    <div className="flex w-full flex-grow sm:flex-grow-0 min-h-[30rem] justify-center md:pb-8">
      <div className="bg-white dark:bg-[#343030] flex w-full sm:w-[27rem] flex-col items-center p-4 sm:rounded-lg shadow-lg shadow-black">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;

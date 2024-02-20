import { Outlet } from "react-router-dom";

const SettingsLayout = () => {
  return (
    <div className="flex flex-col items-center w-full flex-grow sm:flex-grow-0 min-h-[30rem] justify-center md:pb-8">
      <Outlet />
    </div>
  );
};

export default SettingsLayout;
import { Outlet } from "react-router-dom";

const SettingsLayout = () => {
  return (
    <div className="flex flex-col items-center w-full flex-grow sm:min-h-fit sm:max-h-[150vh] justify-center md:pb-8">
      <Outlet />
    </div>
  );
};

export default SettingsLayout;

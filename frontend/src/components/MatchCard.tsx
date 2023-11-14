import React from "react";

const MatchCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 h-[600px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="relative flex h-72 w-full justify-center rounded-xl bg-cover">
            <div className="absolute flex h-[250px] w-[250px] items-center justify-center rounded-full border-[25px] border-white bg-pink-400 dark:!border-navy-700">
              <img
                className="h-40 w-40 rounded-full"
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-3xl font-bold text-navy-700 dark:text-black">
              Adela Parkson
            </h4>
            <p className="text-base font-normal text-gray-600">
              Zagreb, Hrvatska
            </p>
          </div>
          <div className="flex justify-center items-center text-gray-600">
            <p className="flex align-middle text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laudantium recusandae iure
            </p>
          </div>
          <div className="flex justify-between mt-3">
            <button className="text-black flex">Jes</button>
            <button className="text-black flex">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

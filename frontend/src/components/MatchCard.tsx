import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
const MatchCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="relative flex flex-col items-center rounded-[25px] border-[1px] border-black-200 h-[600px] w-[400px] mx-auto p-4 bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black">
          <div className="relative flex h-72 w-full justify-center rounded-xl bg-cover">
            <div className="absolute flex h-[200px] w-[200px] items-center justify-center rounded-full bg-pink-400 ">
              <img
                className="h-40 w-40 rounded-full"
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-4xl font-bold text-navy-700 dark:text-white">
              Adela, 23
            </h4>
            <p className="text-base font-normal text-gray-200">
              Zagreb, Hrvatska
            </p>
            <div className="flex justify-center items-center mt-4 text-gray-400">
              <p className="flex align-middle text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laudantium recusandae iure
              </p>
            </div>
            <div className="flex mt-20 flex-row justify-between w-full">
              <button className="btn hover:bg-green-600 bg-green-500 ml-4 mb-2 border-green-700 rounded-full w-24 h-24">
                <CheckIcon fontSize="large"/>
              </button>
              <button className="btn bg-red-500 hover:bg-red-600 rounded-full mr-4 border-red-700 btn-circle w-24 h-24">
               <ClearIcon fontSize="large"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

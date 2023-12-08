/* eslint-disable @typescript-eslint/no-unused-vars */

import Dropdown from "../components/Dropdown";

const Preferences = () => {
  return (
    <div id="all">
      <form>
        <div
          id="page1"
          className="page flex items-center justify-center h-screen"
        >
          <div className="page flex flex-col items-center w-5">
            Page 1,
            <a className="text-black" href="#page2">
              page 2
            </a>
            <div className="flex flex-row mt-4 justify-between ">
              <div className="ml-12">
                <Dropdown textForLabel="Choose your gender: " />
              </div>
              <div className="ml-2">
                <Dropdown textForLabel="Choose your preferred gender: " />
              </div>
              <button className="text-white bg-black mr-10">Next</button>
            </div>
          </div>
        </div>
        <div className="page" id="page2">
          Page 2<a href="#page3">page3</a>
          <div className="flex justify-center">
            <label className="text-black" htmlFor="userAger">
              Your Age
            </label>
            <input type="number" id="userAge" />
            <label className="text-black" htmlFor="minAge">
              Minimum partner Age
            </label>
            <input type="number" id="minAge" />
            <label className="text-black" htmlFor="maxAge">
              Maximum partner age
            </label>
            <input type="number" id="maxAge" />
          </div>
        </div>
        <div className="page" id="page3">
          <div>
            <h1>Upload some pictures for your account</h1>
            <input type="file" />
          </div>
          Page 3<a href="#page1">page1</a>
        </div>
      </form>
    </div>
  );
};

export default Preferences;

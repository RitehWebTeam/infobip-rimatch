import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { UsersService } from "@/api/users";
import cx from "classnames";

const MatchCard = () => {
  const result = UsersService.useGetPotentailUsers();
  const acceptMatch = UsersService.useAcceptMatch();
  const rejectMatch = UsersService.useRejectMatch();

  // TODO: Add loading spinner or something
  if (result.isLoading || acceptMatch.isPending || rejectMatch.isPending) {
    return null;
  }

  if (result.isError || !result.isSuccess) {
    return <div>Error: {result.error?.message}</div>;
  }

  // TODO: Nicer message when there are no more users
  if (result.data.length === 0) {
    return <div>No more users</div>;
  }

  const user = result.data[0];

  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col items-center rounded-[25px] border-[1px] border-black-200 h-[580px] sm:h-[600] w-[340px] sm:w-[24rem] p-4 bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black">
        <div className="relative flex h-72 w-full justify-center rounded-xl bg-cover">
          <div
            className={cx(
              "absolute flex h-[200px] w-[200px] items-center justify-center rounded-full",
              {
                "bg-pink-400": user.gender === "F",
                "bg-blue-400": user.gender === "M",
              }
            )}
          >
            <img
              className="h-40 w-40 rounded-full"
              src={user.profileImageUrl || "/Default_pfp.svg"}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <h4 className="text-4xl font-bold text-navy-700 dark:text-white">
            {`${user.firstName}, ${user.age}`}
          </h4>
          <p className="text-base font-normal text-gray-200">{user.location}</p>
          <div className="flex justify-center items-center mt-4 text-gray-400">
            <p className="flex align-middle text-center">{user.description}</p>
          </div>
          <div className="flex mt-20 flex-row justify-between w-full">
            <button
              className="btn hover:bg-green-600 bg-green-500 transition-color duration-300 sm:ml-4 mb-2 border-green-700 rounded-full w-24 h-24 shadow-md shadow-black"
              onClick={() => acceptMatch.mutate({ userId: user.id })}
            >
              <CheckIcon fontSize="large" />
            </button>
            <button
              className="btn bg-red-500 hover:bg-red-600 transition-color duration-300 rounded-full sm:mr-4 border-red-700 btn-circle w-24 h-24 shadow-md shadow-black"
              onClick={() => rejectMatch.mutate({ userId: user.id })}
            >
              <ClearIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

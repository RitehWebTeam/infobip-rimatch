import { UsersService } from "@/api/users";

const MyMatches = () => {
  const query = UsersService.useGetMatches();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    return <div>Error</div>;
  }

  const matches = query.data;

  return (
    <div className="flex flex-col justify-center items-center h-5/6 max-h-full mt-8">
      <div className="relative flex flex-col items-center rounded-[25px] border-[1px] border-black-200 w-[400px] mx-auto p-4 bg-[#343030] bg-clip-border border-[#acabab33] shadow-xl shadow-black pl-6 gap-4">
        <h1 className="text-3xl w-full text-center border-b-2 pb-2">
          My matches
        </h1>
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex flex-row gap-8 items-center w-full px-2"
          >
            <div className="flex flex-col justify-center items-center h-[100px]">
              <img
                className="rounded-full w-[80px] h-[80px] border-[1px] border-black-200"
                src={match.profileImageUrl}
                alt="profile_picture"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-red-500">
                {match.firstName} {match.lastName}, {match.age}
              </h1>
              <p className="pl-4">{match.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMatches;

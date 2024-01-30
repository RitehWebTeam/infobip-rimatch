import { ProjectedUser } from "@/types/User";

interface MatchedUsersProps {
  user: ProjectedUser;
}

const MatchedUser = ({ user }: MatchedUsersProps) => {
  return (
    <div className="flex flex-col overflow-hidden relative items-center rounded-lg h-56">
      <div className="absolute w-full h-full bg-gradient-to-t from-black from-0% to-30%"></div>
      <img
        loading="lazy"
        srcSet={user.profileImageUrl}
        className="object-cover w-full h-56"
      />
      <div className="absolute left-4 bottom-2 text-white font-bold text-sm leading-6 whitespace-nowrap">
        {user.firstName}, {user.age}
      </div>
    </div>
  );
};

export default MatchedUser;

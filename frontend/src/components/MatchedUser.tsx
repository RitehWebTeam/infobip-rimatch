interface MatchedUsersProps {
  user: {
    id: number;
    profileImageUrl: string;
    firstName: string;
    lastName: string;
    age: number;
    location: string;
  };
}

const MatchedUser = ({ user }: MatchedUsersProps) => {
  return (
    <div className="flex flex-col overflow-hidden relative items-center rounded-lg">
      <div className="absolute w-full h-full bg-gradient-to-t from-black from-0% to-50%"></div>
      <img
        loading="lazy"
        srcSet={user.profileImageUrl}
        className="object-cover object-center inset-0 h-48"
      />
      <div className="absolute left-4 bottom-2 text-white text-base font-bold leading-6 whitespace-nowrap">
        {user.firstName}, {user.age}
      </div>
    </div>
  );
};

export default MatchedUser;

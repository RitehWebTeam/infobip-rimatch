import { ProjectedUser } from "@/types/User";
import * as Avatar from "@radix-ui/react-avatar";
import { useMemo } from "react";
interface UserAvatarProps {
  user: ProjectedUser;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const userInitials = useMemo(
    () => (user.firstName[0] + user.lastName[0]).toUpperCase(),
    [user.firstName, user.lastName]
  );
  return (
    <Avatar.Root className="inline-flex items-center justify-center h-full w-full select-none rounded-full">
      <Avatar.Image
        src={user.profileImageUrl}
        alt="User profile picture"
        className="w-full h-full object-cover rounded-full"
      />
      <Avatar.AvatarFallback
        className="w-full h-full flex items-center justify-center text-red-500 bg-gray-100 rounded-full border border-red-500"
        delayMs={600}
      >
        {userInitials}
      </Avatar.AvatarFallback>
    </Avatar.Root>
  );
};

export default UserAvatar;

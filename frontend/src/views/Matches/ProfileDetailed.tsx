import ProfileCard from "@/components/ProfileCard";
import { ProjectedUser } from "@/types/User";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileDetailed = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state?.user as ProjectedUser;
  const goBackToMatches = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!user) {
      goBackToMatches();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full justify-center flex-grow md:pb-8">
      <ProfileCard user={user} onClose={goBackToMatches} showChatIcon />
    </div>
  );
};

export default ProfileDetailed;

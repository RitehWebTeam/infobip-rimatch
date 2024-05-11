import { MatchesService } from "@/api/matches";
import ProfileCard from "@/components/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";

const ProfileDetailed = () => {
  const navigate = useNavigate();
  const { userId } = useParams() as { userId: string };
  const query = MatchesService.useGetMatchedUserById(userId);

  const goBackToMatches = () => {
    navigate(-1);
  };
  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.isSuccess) {
    navigate(-1);
    return null;
  }

  return (
    <div className="flex w-full justify-center flex-grow md:pb-8">
      <ProfileCard user={query.data} onClose={goBackToMatches} showChatIcon />
    </div>
  );
};

export default ProfileDetailed;

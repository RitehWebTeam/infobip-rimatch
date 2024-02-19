import useCurrentUserContext from "@/hooks/useCurrentUser";
import { ProjectedUser } from "@/types/User";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useMemo } from "react";
import { Spotify } from "react-spotify-embed";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import cx from "classnames";

interface ProfileCardProps {
  user: ProjectedUser;
  onClose: () => void;
}

interface MatchedTag {
  value: string;
  matched: boolean;
}

const ProfileCard = ({ user, onClose }: ProfileCardProps) => {
  const loggedInUser = useCurrentUserContext();
  const isSpotifySong = useMemo(
    () => user.favouriteSong.search(/open.spotify.com/gi) !== -1,
    [user.favouriteSong]
  );

  const matchedTags = useMemo<MatchedTag[]>(() => {
    const matchTags = user.tags.map((tag) => ({
      value: tag,
      matched: loggedInUser.tags.includes(tag),
    }));
    return matchTags.sort((a) => (a.matched ? -1 : 1));
  }, [user.tags, loggedInUser.tags]);
  return (
    <div className="flex w-full flex-grow justify-center md:pb-8">
      <div className="bg-white  dark:bg-[#343030] flex w-full sm:w-[27rem] flex-col h-fit items-center sm:rounded-lg sm:shadow-lg shadow-black border dark:border-[#343030]">
        <div className="w-full sm:rounded-t-lg bg-[#f3f4f6] dark:bg-[#1e1e1e] flex-grow relative">
          <button
            type="button"
            className="p-1 top-8 left-8 sm:top-4 sm:left-4 absolute rounded-lg border border-[#E8E6EA] font-semibold bg-white/20"
            onClick={onClose}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </button>
          <img
            srcSet={user.profileImageUrl || "/Default_pfp.svg"}
            className="w-full object-cover md:object-contain max-h-[33rem] md:max-h-[26rem] sm:rounded-t-lg"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-8 bg-white dark:bg-[#343030] h-full w-full mt-[-2rem] rounded-t-[2rem] rounded-lg px-12 pt-10 pb-10 z-10">
          <h2 className="text-3xl font-semibold dark:text-red-500">
            {user.firstName} {user.lastName}, {user.age}
          </h2>
          <section>
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="font-light dark:text-gray-300">{user.location}</p>
          </section>
          <section>
            <h3 className="font-semibold mb-1">About</h3>
            <p className="font-light dark:text-gray-300">{user.description}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="font-light dark:text-gray-300 flex flex-wrap w-full gap-4">
              {matchedTags.map((tag, index) => (
                <Tag key={index} tag={tag} />
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-semibold mb-1">Favorite song</h3>
            {isSpotifySong ? (
              <Spotify wide link={user.favouriteSong} />
            ) : (
              <p className="font-light dark:text-gray-300">
                {user.favouriteSong}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

interface TagProps {
  tag: MatchedTag;
}

const Tag = ({ tag }: TagProps) => {
  const tagClasses = cx(
    "font-normal flex items-center gap-0.5 py-1 px-4 justify-center rounded-md border min-w-[4rem]",
    {
      "border-gray-400/40": !tag.matched,
      "border-red-500 text-red-500": tag.matched,
    }
  );
  return (
    <div className={tagClasses}>
      {tag.matched && <DoneAllIcon fontSize="inherit" />}
      {tag.value}
    </div>
  );
};

export default ProfileCard;

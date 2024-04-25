import useCurrentUserContext from "@/hooks/useCurrentUser";
import { ProjectedUser } from "@/types/User";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useMemo, useState } from "react";
import { Spotify } from "react-spotify-embed";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import cx from "classnames";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Link } from "react-router-dom";
import UserActionsDropdown from "./UserActionsDropdown";
import ImageModal from "./ImageModal";

interface ProfileCardProps {
  user: ProjectedUser;
  onClose: () => void;
  showChatIcon?: boolean;
}

interface MatchedTag {
  value: string;
  matched: boolean;
}

const ProfileCard = ({
  user,
  onClose,
  showChatIcon = false,
}: ProfileCardProps) => {
  const [openModal, setOpenModal] = useState("");
  const loggedInUser = useCurrentUserContext();
  const isSpotifySong = useMemo(() => {
    if (!user.favouriteSong) return false;
    return user.favouriteSong?.search(/open.spotify.com/gi) !== -1;
  }, [user.favouriteSong]);

  const matchedTags = useMemo<MatchedTag[]>(() => {
    const matchTags = user.tags.map((tag) => ({
      value: tag,
      matched: loggedInUser.tags.includes(tag),
    }));
    return matchTags.sort((a) => (a.matched ? -1 : 1));
  }, [user.tags, loggedInUser.tags]);

  const matchedImages = user.photos;

  function handleImageDisplay(image: string) {
    console.log("Function works!");

    setOpenModal(image);
  }

  return (
    <div className="bg-white dark:bg-[#343030] flex w-full sm:w-[27rem] flex-col h-fit items-center rounded-lg shadow-lg shadow-black border dark:border-[#343030]">
      <div className="flex w-full p-2 items-center justify-between">
        <button type="button" className="font-semibold " onClick={onClose}>
          <KeyboardArrowLeftIcon fontSize="large" />
        </button>
        <UserActionsDropdown user={user} />
      </div>
      <div className="w-full sm:rounded-t-lg bg-[#f3f4f6] dark:bg-[#1e1e1e] flex-grow">
        <img
          srcSet={user.profileImageUrl || "/Default_pfp.svg"}
          className="w-full object-cover md:object-contain max-h-[33rem] md:max-h-[26rem] sm:rounded-t-lg"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-8 bg-white dark:bg-[#343030] h-full w-full mt-[-2rem] rounded-t-[2rem] rounded-lg px-12 pt-10 pb-10 z-10">
        <div className="flex w-full justify-between gap-4">
          <h2 className="text-2xl font-semibold dark:text-red-500">
            {user.firstName} {user.lastName}, {user.age}
          </h2>
          {showChatIcon && (
            <Link
              to="/messages/chat"
              state={{ user }}
              className="flex -mr-3 justify-center text-xl items-center px-2 py-2 rounded-lg border border-[#E8E6EA] dark:border-[#494343] font-semibold  text-red-500 max-h-10"
            >
              <TelegramIcon fontSize="inherit" />
            </Link>
          )}
        </div>
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

        <section className="relative">
          <h3 className="font-semibold mb-1">Gallery</h3>

          <div className="grid gap-x-3 gap-y-4 grid-cols-3">
            {matchedImages.map((image, index) => (
              <div className="relative" key={index}>
                <img
                  srcSet={image}
                  className="flex-initial w-46 h-48 rounded-[1rem] object-center object-cover"
                  loading="lazy"
                  onClick={() => {
                    handleImageDisplay(image);
                  }}
                />
                {openModal && <ImageModal image={openModal} />}
              </div>
            ))}
          </div>
        </section>
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

import Dropzone from "@/components/forms/Dropzone";

const Step4Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <label htmlFor="favouriteSong">
        Choose your profile picture
        <span className="text-sm block opacity-80 text-slate-400">
          Max size: 500 KB
        </span>
      </label>
      <Dropzone name="profileImageUrl" />
    </div>
  );
};

export default Step4Preferences;

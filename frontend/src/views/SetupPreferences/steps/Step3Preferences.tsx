import SimpleField from "@/components/forms/SimpleField";
import TagInput from "@/components/forms/TagInput";

const Step3Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <div className="flex flex-col gap-2">
        <SimpleField
          name="favouriteSong"
          placeholder="Input your favorite song"
          label="What is your favorite song?"
        />
      </div>
      <div className="flex flex-col gap-2">
        <SimpleField
          name="tags"
          as={TagInput}
          label={
            <>
              Enter some tags:
              <span className="text-sm block opacity-80 text-slate-400">
                (separate with spaces)
              </span>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Step3Preferences;

import SimpleField from "@/components/forms/SimpleField";
import TagInput from "@/components/forms/TagInput";
import FormikSlider from '@/components/forms/FormikSlider';

const Step3Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <div>
        <h2 className="text-md font-bold">Set your preferred Matching radius</h2>
        <FormikSlider name="radius" defaultValue={50} min={1} aria-label="Default" valueLabelDisplay="auto" color= "warning" />
      </div>
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
import TagInput from "@/components/forms/TagInput";
import { ErrorMessage, Field } from "formik";

const Step3Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <div className="flex flex-col gap-2">
        <label htmlFor="favouriteSong">What is your favorite song?</label>
        <Field
          type="string"
          name="favouriteSong"
          id="favouriteSong"
          className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
          placeholder="Input your favorite song"
        />
        <ErrorMessage
          component="div"
          name="favouriteSong"
          className="text-sm pl-2 text-red-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="tags">
          Enter some tags:
          <span className="text-sm block opacity-80 text-slate-400">
            (separate with spaces)
          </span>
        </label>
        <TagInput
          name="tags"
          className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
        />
        <ErrorMessage
          component="div"
          name="tags"
          className="text-sm pl-2 text-red-500"
        />
      </div>
    </div>
  );
};

export default Step3Preferences;

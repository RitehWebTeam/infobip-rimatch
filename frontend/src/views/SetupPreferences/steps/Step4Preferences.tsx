import Dropzone from "@/components/forms/Dropzone";
import { FormikStep } from "@/components/forms/FormikStepper";
import * as Yup from "yup";

const Step4ValidationSchema = Yup.object({
  profileImageUrl: Yup.string().required("Required"),
});

const Step4Preferences = () => {
  return (
    <FormikStep label="Profile image" validationSchema={Step4ValidationSchema}>
      <div className="flex flex-col gap-6 font-Montserrat">
        <label htmlFor="favouriteSong">
          Choose your profile picture
          <span className="text-sm block opacity-80 text-slate-400">
            Max size: 500 KB
          </span>
        </label>
        <Dropzone name="profileImageUrl" />
      </div>
    </FormikStep>
  );
};

export default Step4Preferences;

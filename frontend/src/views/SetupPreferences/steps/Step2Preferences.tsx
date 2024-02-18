import { FormikStep } from "@/components/forms/FormikStepper";
import { ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const Step2ValidationSchema = Yup.object({
  preferences: Yup.object({
    ageGroupMin: Yup.number()
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    ageGroupMax: Yup.number()
      .when("ageGroupMin", ([ageGroupMin], schema) =>
        ageGroupMin
          ? schema.min(ageGroupMin, "Max age must be greater than min age")
          : schema
      )
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    partnerGender: Yup.string().required("Required"),
  }),
});

const Step2Preferences = () => {
  return (
    <FormikStep label="Preferences" validationSchema={Step2ValidationSchema}>
      <div className="flex flex-col gap-6 font-Montserrat">
        <div className="flex flex-col gap-2">
          <label
            className="font-Montserrat"
            htmlFor="preferences.partnerGender"
          >
            Preffered gender:
          </label>

          <Field
            name="preferences.partnerGender"
            id="preferences.partnerGender"
            as="select"
            className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
          >
            <option value="" disabled hidden>
              Choose a Gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Field>
          <ErrorMessage
            component="div"
            name="preferences.partnerGender"
            className="text-sm pl-2 text-red-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="preferences.ageGroupMin">Minimum partner age</label>
          <Field
            type="number"
            name="preferences.ageGroupMin"
            id="preferences.ageGroupMin"
            className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
            placeholder="18 - 99"
          />
          <ErrorMessage
            component="div"
            name="preferences.ageGroupMin"
            className="text-sm pl-2 text-red-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-Montserrat" htmlFor="preferences.ageGroupMax">
            Maximum partner age
          </label>

          <Field
            type="number"
            placeholder="18 - 99"
            name="preferences.ageGroupMax"
            id="preferences.ageGroupMax"
            className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
          ></Field>
          <ErrorMessage
            component="div"
            name="preferences.ageGroupMax"
            className="text-sm pl-2 text-red-500"
          />
        </div>
      </div>
    </FormikStep>
  );
};

export default Step2Preferences;

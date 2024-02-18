import { ErrorMessage, Field } from "formik";

const Step2Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <div className="flex flex-col gap-2">
        <label className="font-Montserrat" htmlFor="preferences.partnerGender">
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
  );
};

export default Step2Preferences;

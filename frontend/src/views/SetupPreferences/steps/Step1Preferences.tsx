import { ErrorMessage, Field } from "formik";

const Step1Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber">Input you phone number</label>
        <Field
          type="string"
          name="phoneNumber"
          id="phoneNumber"
          className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
          placeholder="091 999 999"
        />
        <ErrorMessage
          component="div"
          name="phoneNumber"
          className="text-sm pl-2 text-red-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="location">Where are you from?</label>
        <Field
          type="text"
          name="location"
          id="location"
          className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
          placeholder="Please input your location"
        />
        <ErrorMessage
          component="div"
          name="location"
          className="text-sm pl-2 text-red-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-Montserrat" htmlFor="description">
          Tell us about yourself:
        </label>

        <Field
          as="textarea"
          rows="4"
          placeholder="I like bees..."
          name="description"
          id="description"
          className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
        ></Field>
        <ErrorMessage
          component="div"
          name="description"
          className="text-sm pl-2 text-red-500"
        />
      </div>
    </div>
  );
};

export default Step1Preferences;

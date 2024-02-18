import SimpleField from "@/components/forms/SimpleField";

const Step1Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <div className="flex flex-col gap-2">
        <SimpleField
          label="Input you phone number"
          name="phoneNumber"
          type="string"
          placeholder="091 999 999"
        />
      </div>
      <div className="flex flex-col gap-2">
        <SimpleField
          label="Where are you from?"
          name="location"
          placeholder="Please input your location"
        />
      </div>
      <div className="flex flex-col gap-2">
        <SimpleField
          as="textarea"
          rows="4"
          label="Tell us about yourself:"
          name="description"
          placeholder="I like bees..."
        />
      </div>
    </div>
  );
};

export default Step1Preferences;

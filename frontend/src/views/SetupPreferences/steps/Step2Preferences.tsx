import SimpleField from "@/components/forms/SimpleField";

const Step2Preferences = () => {
  return (
    <div className="flex flex-col gap-6 font-Montserrat">
      <div className="flex flex-col gap-2">
        <SimpleField
          name="preferences.partnerGender"
          label="Preffered gender"
          as="select"
        >
          <option value="" disabled hidden>
            Choose a Gender
          </option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </SimpleField>
      </div>
      <div className="flex flex-col gap-2">
        <SimpleField
          name="preferences.ageGroupMin"
          label="Minimum partner age"
          type="number"
          placeholder="18 - 99"
        />
      </div>
      <div className="flex flex-col gap-2">
        <SimpleField
          name="preferences.ageGroupMax"
          label="Maximum partner age"
          type="number"
          placeholder="18 - 99"
        />
      </div>
    </div>
  );
};

export default Step2Preferences;

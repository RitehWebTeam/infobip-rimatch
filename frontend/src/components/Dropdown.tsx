import { useState } from "react";

const Dropdown = ({
  textForLabel,
  name,
}: {
  textForLabel: string;
  name: string;
}) => {
  const [gender, setGender] = useState("");

  const handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGender(event.target.value);
  };

  return (
    <div className="relative inline-block text-left">
      <label className="text-black" htmlFor="gender">
        {textForLabel}
      </label>

      <select value={gender} onChange={handleChange} name={name} id={name}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default Dropdown;

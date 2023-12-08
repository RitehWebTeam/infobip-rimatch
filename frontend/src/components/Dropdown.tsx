// eslint-disable-next-line @typescript-eslint/no-unused-vars

const Dropdown = ({ textForLabel }: { textForLabel: string }) => {
  return (
    <div className="relative inline-block text-left">
      <label className="text-black" htmlFor="gender">
        {textForLabel}
      </label>

      <select name="gender" id="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default Dropdown;

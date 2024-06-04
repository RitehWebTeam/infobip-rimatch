import Slider from "@mui/material/Slider";
import React from "react";
import { SliderProps } from "@mui/material";
import { useField } from "formik";

interface FormikSliderProps extends Omit<SliderProps, "name"> {
  name: string;
}
const FormikSlider: React.FC<FormikSliderProps> = ({ name, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: unknown, newValue: number | number[] ) => {
    helpers.setValue(newValue);
    console.log(newValue);
  };

  return (
    <Slider
      {...field}
      {...props}
      value={field.value || 0}
      onChange={handleChange}
    />
  );
};

export default FormikSlider;

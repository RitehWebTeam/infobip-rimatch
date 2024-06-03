import { useMemo, useState } from "react";
import { useField } from "formik";

import { View } from "react-native";
import { HelperText, Text, useTheme } from "react-native-paper";

import DropDownPicker from "react-native-dropdown-picker";
const GenderPicker = () => {
  const genderOptions = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
  ];
  const theme = useTheme();
  const [field, meta, helpers] = useField<string>("gender");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(field.value);
  const [items, setItems] = useState(genderOptions);

  const hasError = useMemo(
    () => !!meta.error && meta.touched,
    [meta.error, meta.touched]
  );

  const updateFormikValue = (value: string | null) => {
    helpers.setTouched(true);
    if (!value) {
      helpers.setError("Gender is required");
      return;
    }
    helpers.setError(undefined);
    helpers.setValue(value);
  };

  return (
    <View style={{ position: "relative", marginTop: 4 }}>
   
      <DropDownPicker
        listMode="SCROLLVIEW"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={updateFormikValue}
        zIndex={10}
        style={{
          borderColor: "gray",
          borderWidth: hasError ? 2 : 1,
          backgroundColor: theme.colors.primary,
        }}
      />
      <HelperText type="error" visible={!!meta.error && meta.touched}>
        {meta.error}
      </HelperText>
    </View>
  );
};
export default GenderPicker;
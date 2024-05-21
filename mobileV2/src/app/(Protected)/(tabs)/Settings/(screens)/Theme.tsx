import { Theme } from "@/context/ThemeProvider";
import useTheme from "../../../../../hooks/useTheme";
import { RadioButton } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { Text } from "react-native";

const SettingsTheme = () => {
  const { theme, setThemeMode } = useTheme();

  const [checked, setChecked] = useState("light");
  const handleChange = (value: Theme) => {
    setThemeMode(value);
    console.log("Radio button value", value);
  };

  return (
    <View>
      <View>
        <Text>Theme</Text>
      </View>
      <View className=" flex-row items-center">
        <RadioButton
          value="light"
          status={checked === "light" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("light");
            handleChange("light");
          }}
        />
        <Text>Light</Text>
      </View>
      <View className=" flex-row items-center">
        <RadioButton
          value="dark"
          status={checked === "dark" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("dark");
            handleChange("dark");
          }}
        />
        <Text>Dark</Text>
      </View>
      <View className=" flex-row items-center">
        <RadioButton
          value="system"
          status={checked === "system" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("system");
            handleChange("system");
          }}
        />
        <Text>System</Text>
      </View>
    </View>
  );
};

export default SettingsTheme;

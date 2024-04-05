import { useEffect } from "react";
import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { WizardStore } from "../store";
import { useIsFocused } from "@react-navigation/native";
import { MD3Colors, ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";
/* type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
}; */

const Step2Preferences = () => {
  const { control } = useForm({
    defaultValues: WizardStore.useState((s) => s),
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });
  }, [isFocused]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /* const onSubmit = (data: {
    phoneNumber: string;
    location: string;
    description: string;
  }) => {
    WizardStore.update((s) => {
      s.progress = 33;
      s.phoneNumber = data.phoneNumber;
      s.location = data.location;
      s.description = data.description;
    });
    
    console.log(data);
  }; */
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ProgressBar
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <View style={styles.formEntry}>
        <Text>Preferred gender</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Choose a Gender" value="" />
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
            </Picker>
          )}
          name="preferences.partnerGender"
        />
      </View>
      {/* Similarly integrate Controller for other fields */}
      {/* <Button  onPress={handleSubmit(onSubmit)} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  button: {
    margin: 8,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    flex: 1,
  },
  formEntry: {
    margin: 8,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
export default Step2Preferences;

import { View, Text } from "react-native";

import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useEffect } from "react";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";

import { StyleSheet } from "react-native";
type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step1Preferences = ({ navigation }: Step1PreferencesProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });
  }, [isFocused]);

  const onSubmit = (data: {
    phoneNumber: string;
    location: string;
    description: string;
  }) => {
    WizardStore.update((s) => {
      s.progress = 25;
      s.phoneNumber = data.phoneNumber;
      s.location = data.location;
      s.description = data.description;
    });
    navigation.navigate("Step2" as never);
    console.log(data);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ProgressBar
        progress={WizardStore.getRawState().progress}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <TextInput
                mode="outlined"
                label="PhoneNumber"
                placeholder="Enter Phone Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>

        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <TextInput
                mode="outlined"
                label="Where are you from?"
                placeholder="Enter Location"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="location"
          />
          {errors.location && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          style={styles.button}
        >
          <Text>GOTO STEP TWO</Text>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
export default Step1Preferences;

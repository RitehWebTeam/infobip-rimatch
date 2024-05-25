import { useEffect } from "react";
import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { WizardStore } from "../store";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { TextInput, MD3Colors, ProgressBar, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeProvider";
type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step2Preferences = ({ navigation }: Step1PreferencesProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: WizardStore.useState((s) => s),
  });
  const isFocused = useIsFocused();
  const { theme } = useTheme();
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 25;
      });
  }, [isFocused]);

  const onSubmit = (data: {
    preferences: {
      ageGroupMax: string;
      ageGroupMin: string;
      partnerGender: string;
    };
  }) => {
    WizardStore.update((s) => {
      s.progress = 50;
      s.preferences.ageGroupMax = data.preferences.ageGroupMax;
      s.preferences.ageGroupMin = data.preferences.ageGroupMin;
      s.preferences.partnerGender = data.preferences.partnerGender;
    });
    navigation.navigate("Step 3" as never);
    console.log(data);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={theme.colors.accent}
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

      {/* //TODO Change this to sliders  */}
      <View style={styles.formEntry}>
        <Text>Maximal Partner Age</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <TextInput
              mode="outlined"
              placeholder="Enter Partner Age"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              activeOutlineColor="#EE5253"
            />
          )}
          name="preferences.ageGroupMax"
        />
        {errors.preferences?.ageGroupMax && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>
      <View style={styles.formEntry}>
        <Text>Minimal Partner Age</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <TextInput
              mode="outlined"
              placeholder="Enter Partner Age"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              activeOutlineColor="#EE5253"
            />
          )}
          name="preferences.ageGroupMin"
        />
        {errors.preferences?.ageGroupMin && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        mode="outlined"
        style={{
          margin: 8,
          backgroundColor: theme.colors.accent,
          borderWidth: 2,
        }}
      >
        <Text style={{ color: "white", borderColor: theme.colors.accent }}>
          NEXT
        </Text>
      </Button>
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

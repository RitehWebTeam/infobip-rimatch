import { useEffect } from "react";
import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { WizardStore } from "../store";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { TextInput, MD3Colors, ProgressBar, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
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
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 25;
      });
  }, [isFocused]);

  const onSubmit = (data: {
    ageGroupMax: string;
    ageGroupMin: string;
    partnerGender: string;
  }) => {
    WizardStore.update((s) => {
      s.progress = 50;
      s.ageGroupMax = data.ageGroupMax;
      s.ageGroupMin = data.ageGroupMin;
      s.partnerGender = data.partnerGender;
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
          name="partnerGender"
        />
      </View>
      {/* Similarly integrate Controller for other fields */}

      {/* //TODO Change this to sliders  */}
      <View style={styles.formEntry}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <TextInput
              mode="outlined"
              label="Maximal Partner Age"
              placeholder="Enter Partner Age"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="ageGroupMax"
        />
        {errors.ageGroupMax && (
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
              label="Minimal Partner Age"
              placeholder="Enter Partner Age"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="ageGroupMin"
        />
        {errors.ageGroupMin && (
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

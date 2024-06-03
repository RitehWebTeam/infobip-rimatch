import { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { WizardStore } from "../store";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import {
  TextInput,
  ProgressBar,
  Button,
  HelperText,
  Text,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step2ValidationSchema = Yup.object({
  preferences: Yup.object({
    ageGroupMin: Yup.number()
      .typeError("Age must be a number")
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    ageGroupMax: Yup.number()
      .when("ageGroupMin", ([ageGroupMin], schema) =>
        ageGroupMin
          ? schema.min(ageGroupMin, "Max age must be greater than min age")
          : schema
      )
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    partnerGender: Yup.string().required("Required"),
  }),
});

const Step2Preferences = ({ navigation }: Step1PreferencesProps) => {
  const defaultValues = WizardStore.useState((s) => s, []);
  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      preferences: {
        ageGroupMin: defaultValues.preferences.ageGroupMin,
        ageGroupMax: defaultValues.preferences.ageGroupMax,
        partnerGender: defaultValues.preferences.partnerGender ?? "",
      },
    },
    resolver: yupResolver(Step2ValidationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
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
      ageGroupMin: string | number;
      ageGroupMax: string | number;
      partnerGender: string;
    };
  }) => {
    WizardStore.update((s) => {
      s.progress = 50;
      s.preferences.ageGroupMin = parseInt(
        data.preferences.ageGroupMin as string
      );
      s.preferences.ageGroupMax = parseInt(
        data.preferences.ageGroupMax as string
      );
      s.preferences.partnerGender = data.preferences.partnerGender;
    });
    navigation.navigate("Step 3" as never);
  };
  return (
    <ScrollView
      style={{
        display: "flex",
        backgroundColor: theme.colors.background,
        marginBottom: 16,
      }}
    >
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={theme.colors.accent}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.formEntry}>
          <Text variant="labelLarge" style={{ color: theme.colors.secondary }}>
            Preferred gender
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState }) => (
              <>
                <View
                  style={{
                    borderColor: fieldState.error?.message
                      ? theme.colors.error
                      : "gray",
                    borderWidth: 1,
                    backgroundColor: theme.colors.surface,
                    borderRadius: 4,
                  }}
                >
                  <Picker selectedValue={value} onValueChange={onChange}>
                    <Picker.Item label="Choose a Gender" value="" />
                    <Picker.Item label="Male" value="M" />
                    <Picker.Item label="Female" value="F" />
                  </Picker>
                </View>
                <HelperText
                  type="error"
                  visible={!!fieldState.error?.message}
                  style={{ color: theme.colors.error }}
                >
                  {fieldState.error?.message}
                </HelperText>
              </>
            )}
            name="preferences.partnerGender"
          />
        </View>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <>
                <TextInput
                  mode="outlined"
                  placeholder="Enter Partner Age"
                  label={"Minimum Age"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={!!fieldState.error?.message}
                  value={value?.toString() ?? ""}
                  keyboardType="numeric"
                  activeOutlineColor="#EE5253"
                />
                <HelperText
                  type="error"
                  visible={!!fieldState.error?.message}
                  style={{ color: theme.colors.error }}
                >
                  {fieldState.error?.message}
                </HelperText>
              </>
            )}
            name="preferences.ageGroupMin"
          />
        </View>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <>
                <TextInput
                  mode="outlined"
                  placeholder="Enter Partner Age"
                  label="Maximum Age"
                  onBlur={onBlur}
                  error={!!fieldState.error?.message}
                  onChangeText={onChange}
                  value={value?.toString() ?? ""}
                  keyboardType="numeric"
                  activeOutlineColor="#EE5253"
                />
                <HelperText
                  type="error"
                  visible={!!fieldState.error?.message}
                  style={{ color: theme.colors.error }}
                >
                  {fieldState.error?.message}
                </HelperText>
              </>
            )}
            name="preferences.ageGroupMax"
          />
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          loading={formState.isSubmitting}
          style={{
            backgroundColor: theme.colors.accent,
          }}
        >
          NEXT
        </Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  container: {
    flex: 1,
  },
  formEntry: {},
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
export default Step2Preferences;

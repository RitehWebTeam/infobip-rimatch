import { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { WizardStore } from "../store";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button, ProgressBar, HelperText } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step3ValidationSchema = Yup.object({
  favouriteSong: Yup.string().required("Required"),
  tags: Yup.array()
    .of(Yup.string())
    .required("At least one tag is required")
    .min(1, "At least one tag is required"),
});
const Step3Preferences = ({ navigation }: PreferencesProps) => {
  const { handleSubmit, control } = useForm({
    defaultValues: WizardStore.useState((s) => s),
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(Step3ValidationSchema),
  });
  const isFocused = useIsFocused();
  const { theme } = useTheme();
  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 50;
      });
  }, [isFocused]);

  const onSubmit = (data: {
    favouriteSong: string;
    tags: Array<string | undefined>;
  }) => {
    WizardStore.update((s) => {
      s.progress = 75;
      s.favouriteSong = data.favouriteSong;
      s.tags = data.tags.filter(Boolean) as string[];
    });
    navigation.navigate("Step 4" as never);
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
          <Text style={{ color: theme.colors.secondary }}>
            What is your favourite song?
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <>
                <TextInput
                  mode="outlined"
                  placeholder="Enter song name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  activeOutlineColor="#EE5253"
                  label="Favourite Song"
                  error={!!fieldState.error?.message}
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
            name="favouriteSong"
          />
        </View>
        <View style={styles.formEntry}>
          <Text style={{ color: theme.colors.secondary }}>Enter Some Tags</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <>
                <TextInput
                  mode="outlined"
                  placeholder="(separate with spaces)"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text.split(/[, ]/))}
                  value={Array.isArray(value) ? value.join(" ") : value}
                  activeOutlineColor="#EE5253"
                  error={!!fieldState.error?.message}
                  label="Tags"
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
            name="tags"
          />
        </View>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
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
  formEntry: {
    display: "flex",
    gap: 8,
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
export default Step3Preferences;

import { ScrollView, View } from "react-native";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useEffect } from "react";
import {
  Button,
  ProgressBar,
  TextInput,
  Text,
  HelperText,
} from "react-native-paper";
import * as Yup from "yup";
import { useTheme } from "@/context/ThemeProvider";
import { StyleSheet } from "react-native";
import useLogout from "@/hooks/useLogout";
import { yupResolver } from "@hookform/resolvers/yup";

type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step1Schema = Yup.object().shape({
  phoneNumber: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const Step1Preferences = ({ navigation }: Step1PreferencesProps) => {
  const defaultValues = WizardStore.useState((s) => s, []);
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: yupResolver(Step1Schema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const logout = useLogout();
  const isFocused = useIsFocused();
  const { theme } = useTheme();

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
    navigation.navigate("Step 2" as never);
  };
  return (
    <ScrollView
      style={{
        display: "flex",
        backgroundColor: theme.colors.background,
        marginBottom: 16,
      }}
    >
      <View>
        <ProgressBar
          style={styles.progressBar}
          progress={WizardStore.useState().progress / 100}
          color={theme.colors.accent}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.formEntry}>
          <Text variant="labelLarge" style={{ color: theme.colors.secondary }}>
            Please enter your phone number
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Phone number"
                  placeholder="091 123 4567"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  error={!!fieldState.error?.message}
                  activeOutlineColor={theme.colors.accent}
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
            name="phoneNumber"
          />
        </View>

        <View style={styles.formEntry}>
          <Text variant="labelLarge" style={{ color: theme.colors.secondary }}>
            Where are you from?
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <>
                <TextInput
                  mode="outlined"
                  placeholder="Enter Location"
                  label="Location"
                  error={!!fieldState.error?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  activeOutlineColor={theme.colors.accent}
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
            name="location"
          />
        </View>
        <View style={styles.formEntry}>
          <Text variant="labelLarge" style={{ color: theme.colors.secondary }}>
            Tell people about yourself
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <>
                <TextInput
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  label="Description"
                  placeholder="I like bees..."
                  error={!!fieldState.error?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  activeOutlineColor={theme.colors.accent}
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
            name="description"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSubmit(onSubmit)}
            mode="contained"
            style={{
              backgroundColor: theme.colors.accent,
            }}
          >
            NEXT
          </Button>
          <Button
            onPress={() => logout()}
            mode="contained"
            style={{
              backgroundColor: theme.colors.secondary,
            }}
          >
            Logout
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formEntry: {
    display: "flex",
    gap: 4,
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    display: "flex",
    gap: 8,
  },
});
export default Step1Preferences;

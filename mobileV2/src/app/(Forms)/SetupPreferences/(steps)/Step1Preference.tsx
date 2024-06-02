import { View, Text } from "react-native";

import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../store";
import { useEffect } from "react";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";

import { StyleSheet } from "react-native";
import useLogout from "@/hooks/useLogout";
type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};
import { useTheme } from "@/context/ThemeProvider";

const Step1Preferences = ({ navigation }: Step1PreferencesProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
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
    console.log(data);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary,
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
          <Text style={{ color: theme.colors.secondary }}>
            Please enter your phone number
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <TextInput
                mode="outlined"
                label="091 123 4567"
                placeholder="Enter Phone Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                activeOutlineColor="#EE5253"
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
          <Text style={{ color: theme.colors.secondary }}>
            Where are you from?
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <TextInput
                mode="outlined"
                placeholder="Enter Location"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor="#EE5253"
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
        <View style={styles.formEntry}>
          <Text style={{ color: theme.colors.secondary }}>
            Tell people about yourself
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                placeholder="I like bees..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor="#EE5253"
              />
            )}
            name="description"
          />
          {errors.description && (
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
        <Button
          onPress={() => logout()}
          mode="outlined"
          style={{
            margin: 8,
            backgroundColor: theme.colors.accent,
            borderWidth: 2,
          }}
        >
          <Text style={{ color: "white", borderColor: theme.colors.accent }}>
            Logout
          </Text>
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

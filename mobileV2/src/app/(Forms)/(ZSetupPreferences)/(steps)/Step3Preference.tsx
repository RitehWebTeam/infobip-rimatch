import { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { WizardStore } from "../store";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button, ProgressBar, MD3Colors } from "react-native-paper";
import { StyleSheet } from "react-native";
type PreferencesProps = {
  navigation: NavigationProp<object>;
};
const Step3Preferences = ({ navigation }: PreferencesProps) => {
  //const [tags, setTags] = React.useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 50;
      });
  }, [isFocused]);

  const onSubmit = (data: { favouriteSong: string; tags: string[] }) => {
    WizardStore.update((s) => {
      s.progress = 75;
      s.favouriteSong = data.favouriteSong;
      s.tags = data.tags;
    });
    navigation.navigate("Step4" as never);
    console.log(data);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <View style={styles.formEntry}>
        <Text>What is your favourite song?</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <TextInput
              mode="outlined"
              placeholder="Enter song name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="favouriteSong"
        />
        {errors.favouriteSong && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>
      <View style={styles.formEntry}>
        <Text>Enter Some Tags</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <TextInput
              mode="outlined"
              placeholder="(separate with spaces)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={Array.isArray(value) ? value.join(" ") : value}
            />
          )}
          name="tags"
        />
        {errors.tags && (
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
        <Text>NEXT</Text>
      </Button>
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
export default Step3Preferences;

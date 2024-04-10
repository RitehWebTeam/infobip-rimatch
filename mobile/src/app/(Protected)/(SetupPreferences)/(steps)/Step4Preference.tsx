import { NavigationProp, useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import ImagePicker, {
  ImageLibraryOptions,
  MediaType,
} from "react-native-image-picker"; // Import MediaType
import { WizardStore } from "../store";
import { useForm } from "react-hook-form";
import { Button, MD3Colors, ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";
type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step4Preferences = ({ navigation }: Step1PreferencesProps) => {
  const [profileImageUrl, setProfileImageUrl] = React.useState<string | null>(
    null
  ); // Specify the type of profileImageUrl
  const { handleSubmit } = useForm({
    defaultValues: WizardStore.useState((s) => s),
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 75;
      });
  }, [isFocused]);

  const onSubmit = (data: {
    /* profileImageUrl: string */
  }) => {
    WizardStore.update((s) => {
      s.progress = 100;
      //s.profileImageUrl = parse data.profileImageUrl;
    });
    navigation.navigate("Confirmation" as never);
    console.log(data);
  };
  const options: ImageLibraryOptions = {
    // Use ImageLibraryOptions

    mediaType: "photo" as MediaType, // Specify the type of media to pick
  };

  const showCameraRoll = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.errorCode) {
        console.log("LaunchImageLibrary Error: ", response.errorMessage);
      } else {
        const profileImageUri = response.assets?.[0]?.uri ?? null; // Add null check for response.assets
        setProfileImageUrl(profileImageUri);
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <Text>Choose your profile picture</Text>
      <Text style={{ fontSize: 12, color: "gray", marginBottom: 8 }}>
        Max size: 500 KB
      </Text>
      <Button onPress={showCameraRoll}>
        <Text>Choose Image</Text>
      </Button>
      {profileImageUrl && (
        <View style={{ marginTop: 20 }}>
          <Text>Selected Image:</Text>
          <Image
            source={{ uri: profileImageUrl }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        </View>
      )}
      <Button onPress={handleSubmit(onSubmit)} mode="outlined">
        <Text>NEXT</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    flex: 1,
  },

  // eslint-disable-next-line react-native/no-unused-styles
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
});
export default Step4Preferences;

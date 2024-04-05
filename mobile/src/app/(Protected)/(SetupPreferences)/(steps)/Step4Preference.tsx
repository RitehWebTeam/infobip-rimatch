import { NavigationProp, useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import ImagePicker, {
  ImageLibraryOptions,
  MediaType,
} from "react-native-image-picker"; // Import MediaType
import { WizardStore } from "../store";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";

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

  const onSubmit = (data: { profileImageUrl: string }) => {
    WizardStore.update((s) => {
      s.progress = 100;
      s.profileImageUrl = data.profileImageUrl;
    });
    navigation.navigate("Step2" as never);
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
      <Text>Choose your profile picture</Text>
      <Text style={{ fontSize: 12, color: "gray", marginBottom: 8 }}>
        Max size: 500 KB
      </Text>
      <Button onPress={showCameraRoll}>
        <Text>hoose Image</Text>
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
        <Text>GOTO STEP TWO</Text>
      </Button>
    </View>
  );
};

export default Step4Preferences;

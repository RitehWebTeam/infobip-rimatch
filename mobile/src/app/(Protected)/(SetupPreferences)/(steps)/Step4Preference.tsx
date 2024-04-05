import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, Image } from "react-native";
import ImagePicker, {
  ImageLibraryOptions,
  MediaType,
} from "react-native-image-picker"; // Import MediaType

type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step4Preferences = ({ navigation }: Step1PreferencesProps) => {
  const [profileImageUrl, setProfileImageUrl] = React.useState<string | null>(
    null
  ); // Specify the type of profileImageUrl

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
      <Button title="Select Picture" onPress={showCameraRoll} />
      {profileImageUrl && (
        <View style={{ marginTop: 20 }}>
          <Text>Selected Image:</Text>
          <Image
            source={{ uri: profileImageUrl }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        </View>
      )}
      <Button
        title="Next"
        onPress={() => navigation.navigate("Confirmation" as never)}
      ></Button>
    </View>
  );
};

export default Step4Preferences;

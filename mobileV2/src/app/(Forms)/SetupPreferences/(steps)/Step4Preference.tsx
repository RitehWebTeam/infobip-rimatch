import { NavigationProp, useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { WizardStore } from "../store";
import { useForm } from "react-hook-form";
import { Button, ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeProvider";

type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step4Preferences = ({ navigation }: Step1PreferencesProps) => {
  const [profileImageUrl, setProfileImageUrl] = React.useState<Asset | null>();
  const { theme } = useTheme();
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

  const onSubmit = () => {
    WizardStore.update((s) => {
      s.progress = 100;
      s.profileImageUrl = profileImageUrl!;
    });
    navigation.navigate("Confirmation" as never);
  };
  //Ovo je ružan library ali za pocetak je okej
  const showCameraRoll = async () => {
    const response = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
    });

    if (response && response.assets) {
      setProfileImageUrl(response.assets[0]);
    } else {
      setProfileImageUrl(null);
    }
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
      <View style={{ paddingHorizontal: 16, display: "flex", gap: 16 }}>
        <View>
          <Text style={{ color: theme.colors.secondary }}>
            Choose your profile picture
          </Text>
          <Text style={{ fontSize: 12, color: "gray", marginBottom: 8 }}>
            Max size: 500 KB
          </Text>
          <Button onPress={showCameraRoll}>
            <Text style={{ color: theme.colors.accent }}>Choose Image</Text>
          </Button>
          {profileImageUrl && (
            <View
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Text>Selected Image:</Text>
              <Image
                source={{ uri: profileImageUrl.uri || "" }}
                style={{ width: 200, height: 200, marginTop: 10 }}
              />
            </View>
          )}
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

import { NavigationProp, useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import  {
  launchImageLibrary,
  
} from "react-native-image-picker"; // Import MediaType
import { WizardStore } from "../store";
import { Controller, set, useForm } from "react-hook-form";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
type Step1PreferencesProps = {
  navigation: NavigationProp<object>;
};

const Step4Preferences = ({ navigation }: Step1PreferencesProps) => {
  const [profileImageUrl, setProfileImageUrl] = React.useState<string | null>(
    null
  ); // Specify the type of profileImageUrl
  const {  control,handleSubmit,formState: { errors } } = useForm({
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
     profileImageUrl: string 
  }) => {
    WizardStore.update((s) => {
      s.progress = 100;
      s.profileImageUrl =  data.profileImageUrl;
    });
    navigation.navigate("Confirmation" as never);
    console.log(data);
  };
  //Ovo je ružan library ali za pocetak je okej 
  const showCameraRoll = async () => {
    const response = await launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
      },
      
    );
    
    if (response && response.assets && response.assets.length > 0) {
      setProfileImageUrl(response.assets[0].uri as string);
    } else {
      setProfileImageUrl(null);
    }
    
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
       <View >
        <Text>enter image url</Text>
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
          name="profileImageUrl"
        />
        {errors.profileImageUrl && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>
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

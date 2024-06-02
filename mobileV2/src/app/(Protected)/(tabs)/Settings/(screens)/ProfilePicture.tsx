import { UsersService } from "./../../../../../api/users";
import useCurrentUserContext from "../../../../../hooks/useCurrentUser";
import { Formik, FormikHelpers } from "formik";
//import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@/context/ThemeProvider";
import { Asset } from "@/types/User";
const validationSchema = Yup.object({
  profileImageUrl: Yup.mixed<File>()
    .required("Required")
    .test("fileSize", "File size must be smaller than 500KB", (value) => {
      return value && value.size <= 500 * 1024;
    }),
});

const SettingsProfilePicture = () => {
  const user = useCurrentUserContext();
  const [profileImageUrl, setProfileImageUrl] = React.useState<File | null>();
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);
  const { theme } = useTheme();
  const { mutateAsync: updateProfilePicture } =
    UsersService.useUpdateProfilePicture();

  const initialValues: UserProfileUpdateData = {
    profileImageUrl: user.profileImageUrl,
  };

  type UserProfileUpdateData = { profileImageUrl: Asset | string };

  //TODO Submitting images not yet implemented
  const handleSubmit = async (
    values: UserProfileUpdateData,
    helpers: FormikHelpers<UserProfileUpdateData>
  ) => {
    helpers.setSubmitting(true);
    console.log("calles");
    await updateProfilePicture(values.profileImageUrl as Asset);
    helpers.resetForm({ values });
  };

  const showCameraRoll = async () => {
    const response = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
    });

    if (response && response.assets) {
      setProfileImageUrl(response.assets[0] as File | null);
      setPhotoUri(response.assets[0].uri as string);
    } else {
      setProfileImageUrl(null);
    }
  };

  const test = () => {
    console.log("test");
  };

  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <>
            <View className=" relative mt-12">
              <TouchableOpacity onPress={showCameraRoll}>
                <View className=" flex justify-center items-center ">
                  <Image
                    source={{
                      uri: user.profileImageUrl,
                    }}
                    style={{
                      width: 200,
                      height: 200,
                      borderColor: theme.colors.secondary,
                      borderWidth: 2,
                      borderRadius: 50,
                      marginTop: 10,
                    }}
                  />

                  <TouchableOpacity
                    onPress={showCameraRoll}
                    className="absolute left-16 bottom-0  z-10 w-10 h-10  bg-[#ee5253] rounded-full flex justify-center items-center text-white"
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <View className="flex justify-center items-center mt-24 mb-56">
                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={{ backgroundColor: theme.colors.accent }}
                >
                  <Text style={{ color: "white" }}>Login</Text>
                </Button>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SettingsProfilePicture;

import { UsersService } from "@api/users";
import { Formik, FormikHelpers } from "formik";
import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@/context/ThemeProvider";
import useCurrentUserContext from "@hooks/useCurrentUser";

const SettingsProfilePicture = () => {
  const user = useCurrentUserContext();
  const [photoUri, setPhotoUri] = React.useState<string>(user.profileImageUrl);
  const [photo, setPhoto] = React.useState<Asset | null>(null);
  const { theme } = useTheme();
  const { mutateAsync: updateProfilePicture } =
    UsersService.useUpdateProfilePicture();

  const initialValues: UserProfileUpdateData = {
    profileImageUrl: user.profileImageUrl,
  };

  type UserProfileUpdateData = { profileImageUrl: Asset | string };

  const handleSubmit = async (
    values: UserProfileUpdateData,
    helpers: FormikHelpers<UserProfileUpdateData>
  ) => {
    if (!photo) return;
    helpers.setSubmitting(true);
    await updateProfilePicture(photo);
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
      setPhotoUri(response.assets[0].uri as string);
      setPhoto(response.assets[0] as Asset);
    }
  };

  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, isSubmitting }) => (
          <>
            <View className=" relative mt-12">
              <TouchableOpacity onPress={showCameraRoll}>
                <View className=" flex justify-center items-center ">
                  <Image
                    source={{
                      uri: photoUri,
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
                  disabled={photoUri === user.profileImageUrl || isSubmitting}
                  style={{ backgroundColor: theme.colors.accent }}
                >
                  Save
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

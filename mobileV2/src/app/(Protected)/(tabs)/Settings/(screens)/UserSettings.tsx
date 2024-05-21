import { useState } from "react";
import useCurrentUserContext from "../../../../../hooks/useCurrentUser";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UsersService } from "@api/users";

/* import TagInput from "@/components/forms/TagInput"; */
import SaveCancelButtons from "../../../../../components/SaveCancelButtons";
import { View, Text, ScrollView } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { useTheme } from "@/context/ThemeProvider";

const updatePreferenceSchema = Yup.object({
  phoneNumber: Yup.number().required("Required"),

  age: Yup.number()
    .when("minAge", ([minAge], schema) =>
      minAge
        ? schema.min(minAge, "Max age must be greater than min age")
        : schema
    )
    .required("Required")
    .max(99, "Age must be between 18 and 99")
    .min(18, "Age must be between 18 and 99"),
  description: Yup.string().required("Required"),
  favouriteSong: Yup.string().required("Required"),

  location: Yup.string().required("Required"),
});

interface UserProfileUpdateData {
  phoneNumber: string;
  age: number;
  description: string;
  favouriteSong: string;
  location: string;
  tags: string[];
}

type ResetFormFunction = FormikHelpers<UserProfileUpdateData>["resetForm"];

const UserSettings = ({ navigation }: { navigation: any }) => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();
  const { theme } = useTheme();

  const handleCancleClick = (resetForm: ResetFormFunction) => {
    setEditMode(false);
    resetForm();
  };

  const initialValues: UserProfileUpdateData = {
    phoneNumber: user.phoneNumber ?? "",
    age: user.age ?? undefined,
    description: user.description ?? "",
    favouriteSong: user.favouriteSong ?? "",
    location: user.location ?? "",
    tags: user.tags ?? [],
  };

  const handleSubmit = async (
    values: UserProfileUpdateData,
    helpers: FormikHelpers<UserProfileUpdateData>
  ) => {
    await updateUser(values);
    setEditMode(false);
    helpers.resetForm({ values });
  };

  return (
    <ScrollView>
      <View className=" overflow-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={updatePreferenceSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
            errors,
            touched,
            resetForm,
            submitForm,
          }) => (
            <>
              <View
                className="w-full flex flex-col relative gap-1 px-4"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <View className=" flex-row justify-between gap-y-3 pl-1">
                  <View className="flex flex-col gap-1">
                    <Text style={{ color: theme.colors.secondary }}>
                      Phone Number
                    </Text>
                    <TextInput
                      mode="outlined"
                      error={!!errors.phoneNumber && touched.phoneNumber}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      placeholder={values.phoneNumber}
                      placeholderTextColor={!editMode ? "gray" : "white"}
                      disabled={!editMode}
                      style={{ backgroundColor: theme.colors.tertiary }}
                      activeOutlineColor="#ee5253"
                    />
                    <HelperText
                      type="error"
                      visible={!!errors.phoneNumber && touched.phoneNumber}
                    >
                      {touched.phoneNumber && errors.phoneNumber}
                    </HelperText>
                  </View>
                  <View className="flex flex-col gap-1 w-2/6">
                    <Text style={{ color: theme.colors.secondary }}>Age</Text>
                    <TextInput
                      mode="outlined"
                      error={!!errors.age && touched.age}
                      onChangeText={handleChange("age")}
                      onBlur={handleBlur("age")}
                      placeholder={values.age.toString()}
                      placeholderTextColor={!editMode ? "gray" : "white"}
                      disabled={!editMode}
                      style={{ backgroundColor: theme.colors.tertiary }}
                      activeOutlineColor="#ee5253"
                    />
                    <HelperText
                      type="error"
                      visible={!!errors.age && touched.age}
                    >
                      {touched.age && errors.age}
                    </HelperText>
                  </View>
                  <View className=" items-center justify-center">
                    <SaveCancelButtons
                      editMode={editMode}
                      isSubmitting={isSubmitting}
                      handleCancelClick={() => handleCancleClick(resetForm)}
                      handleEditClick={() => setEditMode(true)}
                      handleSubmitClick={submitForm}
                    />
                  </View>
                </View>
                <View className="flex flex-col gap-1">
                  <Text style={{ color: theme.colors.secondary }}>
                    Favorite Song
                  </Text>
                  <TextInput
                    mode="outlined"
                    error={!!errors.favouriteSong && touched.favouriteSong}
                    onChangeText={handleChange("favouriteSong")}
                    onBlur={handleBlur("favouriteSong")}
                    placeholder={values.favouriteSong}
                    placeholderTextColor={!editMode ? "gray" : "white"}
                    disabled={!editMode}
                    style={{ backgroundColor: theme.colors.tertiary }}
                    activeOutlineColor="#ee5253"
                  />
                  <HelperText
                    type="error"
                    visible={!!errors.favouriteSong && touched.favouriteSong}
                  >
                    {touched.favouriteSong && errors.favouriteSong}
                  </HelperText>
                </View>

                <View className="flex flex-col gap-1">
                  <Text style={{ color: theme.colors.secondary }}>
                    Location
                  </Text>
                  <TextInput
                    mode="outlined"
                    error={!!errors.location && touched.location}
                    onChangeText={handleChange("location")}
                    onBlur={handleBlur("location")}
                    placeholder={values.location}
                    placeholderTextColor={!editMode ? "gray" : "white"}
                    disabled={!editMode}
                    style={{ backgroundColor: theme.colors.tertiary }}
                    activeOutlineColor="#ee5253"
                  />
                  <HelperText
                    type="error"
                    visible={!!errors.location && touched.location}
                  >
                    {touched.location && errors.location}
                  </HelperText>
                </View>
                <View className="flex flex-col gap-2 mr-1  mb-36">
                  <Text style={{ color: theme.colors.secondary }}>
                    Description
                  </Text>
                  <TextInput
                    mode="outlined"
                    error={!!errors.description && touched.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    placeholder={values.description}
                    placeholderTextColor={!editMode ? "gray" : "white"}
                    disabled={!editMode}
                    style={{ backgroundColor: theme.colors.tertiary }}
                    activeOutlineColor="#ee5253"
                  />
                  <HelperText
                    type="error"
                    visible={!!errors.description && touched.description}
                  >
                    {touched.description && errors.description}
                  </HelperText>
                </View>
                {/*TODO Tags not implemented yet <View className="flex flex-col gap-2">
                <TextInput
                  name="tags"
                  as={TagInput}
                  disabled={!editMode}
                  label={
                    <>
                      Tags{" "}
                      <View className="text-sm opacity-80 text-slate-400">
                        (separate with spaces)
                      </View>
                    </>
                  }
                />
              </View> */}
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default UserSettings;


import useCurrentUserContext from "../../../../../hooks/useCurrentUser";
import {  Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { UsersService } from "../../../../../api/users";

import SaveCancelButtons from "../../../../../components/SaveCancelButtons";
import { View ,Text} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import GenderSelect from "../../../../../components/GenderPicker";
import { useTheme } from "../../../../../context/ThemeProvider";
const updatePreferenceSchema = Yup.object({
  preferences: Yup.object({
    ageGroupMin: Yup.number()
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    ageGroupMax: Yup.number()
      .when("ageGroupMin", ([ageGroupMin], schema) =>
        ageGroupMin
          ? schema.min(ageGroupMin, "Max age must be greater than min age")
          : schema
      )
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    partnerGender: Yup.string().required("Required"),
  }),
});

const Preferences = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();
  const {theme} = useTheme();
  
  const initialValues = {
    preferences: {
      ageGroupMin: user.preferences.ageGroupMin ?? undefined,
      ageGroupMax: user.preferences.ageGroupMax ?? undefined,
      partnerGender: user.preferences.partnerGender ?? "",
    },
  };

  type UserPrefrenceUpdateData = typeof initialValues;
  type ResetFormFunction = FormikHelpers<UserPrefrenceUpdateData>["resetForm"];

  const handleCancleClick = (resetForm: ResetFormFunction) => {
    setEditMode(false);
    resetForm();
  };

  const handleSaveClick = async (
    values: UserPrefrenceUpdateData,
    helpers: FormikHelpers<UserPrefrenceUpdateData>
  ) => {
    await updateUser(values);
    setEditMode(false);
    helpers.resetForm({ values });
  };

  return (
    <View className="flex-1 justify-center " style={{backgroundColor: theme.colors.primary}}>
      <Formik
        initialValues={initialValues}
        validationSchema={updatePreferenceSchema}
        onSubmit={handleSaveClick}
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
        submitForm
      }) => (
          <>
            <View className="flex items-end mr-8">
               <SaveCancelButtons
                editMode={editMode}
                isSubmitting={isSubmitting}
                handleCancelClick={() => handleCancleClick(resetForm)}
                handleEditClick={() => setEditMode(true)}
                handleSubmitClick={submitForm}
              /> 
            </View>
            <View className="flex flex-col px-6 w-full " >
              <View className="flex flex-col gap-2 mb-5 w-full">
                <Text style ={{color:theme.colors.secondary}}>Min Age</Text>
                <TextInput
                    className="   shadow-red-600 drop-shadow-lg"
                    mode="outlined"
                    error={!!errors.preferences?.ageGroupMin && touched.preferences?.ageGroupMin}
                    onChangeText={handleChange("preferences.ageGroupMin")}
                    onBlur={handleBlur("preferences.ageGroupMin")}
                    placeholder={values.preferences?.ageGroupMin.toString()}
                    disabled={!editMode}
                    style = {{backgroundColor:theme.colors.tertiary}}
                    placeholderTextColor={!editMode ?  "gray" : "white"}
                    activeOutlineColor="#ee5253"
                />
              <HelperText
                type="error"
                visible={!!errors.preferences?.ageGroupMin && touched.preferences?.ageGroupMin}
              >
                {touched.preferences?.ageGroupMin && errors.preferences?.ageGroupMin}
              </HelperText>
              
              </View>
              <View className="flex flex-col gap-2 mb-5">
                <Text style ={{color:theme.colors.secondary}}>Max Age</Text>
                <TextInput
                    className=" shadow-lg  shadow-red-600 "
                    mode="outlined"
                    error={!!errors.preferences?.ageGroupMin && touched.preferences?.ageGroupMin}
                    onChangeText={handleChange("preferences.ageGroupMax")}
                    onBlur={handleBlur("preferences.ageGroupMax")}
                    placeholder={values.preferences?.ageGroupMax.toString()}
                    placeholderTextColor={!editMode ?  "gray" : "white"}
                    disabled={!editMode}
                    style = {{backgroundColor:theme.colors.tertiary}}
                    activeOutlineColor="#ee5253"
                />
                <HelperText
                type="error"
                visible={!!errors.preferences?.ageGroupMax && touched.preferences?.ageGroupMax}
              >
                {touched.preferences?.ageGroupMax && errors.preferences?.ageGroupMax}
              </HelperText>
              </View>
              <View className="flex flex-col gap-2 mt-1">
              <Text style = {{color: theme.colors.secondary}}>Prefered gender</Text>
                 <GenderSelect />
                
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Preferences;
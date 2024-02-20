import * as SettingsCard from "@/components/SettingsCard";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { UsersService } from "@/api/users";
import SimpleField from "@/components/forms/SimpleField";
import SaveCancelButtons from "@/components/forms/SaveCancelButtons";

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

const SettingsPreferences = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();

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
    <SettingsCard.Root>
      <Formik
        initialValues={initialValues}
        validationSchema={updatePreferenceSchema}
        onSubmit={handleSaveClick}
      >
        {({ isSubmitting, resetForm, submitForm }) => (
          <>
            <SettingsCard.Header title="Preferences">
              <SaveCancelButtons
                editMode={editMode}
                isSubmitting={isSubmitting}
                handleCancelClick={() => handleCancleClick(resetForm)}
                handleEditClick={() => setEditMode(true)}
                handleSubmitClick={submitForm}
              />
            </SettingsCard.Header>
            <Form className="flex flex-col px-4 w-full" autoComplete="off">
              <div className="flex flex-col gap-2 mb-3 w-full">
                <SimpleField
                  label="Min Age"
                  name="preferences.ageGroupMin"
                  type="number"
                  disabled={!editMode}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <SimpleField
                  label="Max Age"
                  name="preferences.ageGroupMax"
                  type="number"
                  disabled={!editMode}
                />
              </div>
              <div className="flex flex-col gap-2">
                <SimpleField
                  label="Preferred Gender:"
                  name="preferences.partnerGender"
                  as="select"
                  disabled={!editMode}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </SimpleField>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </SettingsCard.Root>
  );
};

export default SettingsPreferences;

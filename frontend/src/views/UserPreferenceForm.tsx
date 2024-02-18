import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { UsersService } from "@/api/users";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import SimpleField from "@/components/forms/SimpleField";

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

const UserPreferenceForm = () => {
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

  type UpdatePreferenceValues = typeof initialValues;

  const handleCancleClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = async (
    values: UpdatePreferenceValues,
    helpers: FormikHelpers<UpdatePreferenceValues>
  ) => {
    await updateUser(values);
    setEditMode(false);
    helpers.resetForm({ values });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePreferenceSchema}
      onSubmit={handleSaveClick}
    >
      {({ isSubmitting, resetForm }) => (
        <Form className="flex flex-col px-4 w-full relative">
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

          <div className="absolute right-0 -top-12 flex text-2xl gap-6">
            {isSubmitting && editMode ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : !editMode ? (
              <div
                className="cursor-pointer hover:text-orange-400 text-2xl"
                onClick={() => setEditMode(true)}
              >
                <ModeEditIcon color="inherit" fontSize="inherit" />
              </div>
            ) : (
              <>
                <button type="submit">
                  <CheckIcon
                    color="inherit"
                    fontSize="inherit"
                    className="hover:text-green-500"
                  />
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    handleCancleClick();
                  }}
                  className="hover:text-red-700"
                >
                  <CloseIcon color="inherit" fontSize="inherit" />
                </button>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserPreferenceForm;

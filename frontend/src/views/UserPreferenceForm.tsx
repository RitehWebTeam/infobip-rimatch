import useCurrentUserContext from "@/hooks/useCurrentUser";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { UsersService } from "@/api/users";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

const updatePreferenceSchema = Yup.object({
  minAge: Yup.number()
    .required("Required")
    .max(99, "Age must be between 18 and 99")
    .min(18, "Age must be between 18 and 99"),
  maxAge: Yup.number()
    .when("minAge", ([minAge], schema) =>
      minAge
        ? schema.min(minAge, "Max age must be greater than min age")
        : schema
    )
    .required("Required")
    .max(99, "Age must be between 18 and 99")
    .min(18, "Age must be between 18 and 99"),
});

const UserPreferenceForm = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();

  const initialValues = {
    minAge: user.preferences.ageGroupMin ?? "",
    maxAge: user.preferences.ageGroupMax ?? "",
    preferredGender: user.preferences.partnerGender ?? "",
  };

  const handleCancleClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = async (values: typeof initialValues) => {
    await updateUser({
      preferences: {
        ageGroupMax: values.maxAge,
        ageGroupMin: values.minAge,
        partnerGender: values.preferredGender,
      },
    });
    setEditMode(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePreferenceSchema}
      onSubmit={handleSaveClick}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col px-4 w-full relative">
          <div className="flex flex-col gap-2 mb-3 w-full">
            <label className="block ">Min Age:</label>
            <Field
              type="number"
              id="minAge"
              name="minAge"
              disabled={!editMode}
              className="w-full p-3 border rounded"
            />
            <ErrorMessage
              component="div"
              name="minAge"
              className="pl-2 text-red-500 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <label className="block ">Max Age:</label>
            <Field
              type="number"
              id="maxAge"
              name="maxAge"
              disabled={!editMode}
              className="w-full p-3 border rounded"
            />
            <ErrorMessage
              component="div"
              name="maxAge"
              className="pl-2 text-red-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block ">Preferred Gender:</label>
            <Field
              as="select"
              id="preferredGender"
              name="preferredGender"
              disabled={!editMode}
              className="w-full p-3 border rounded"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Field>
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
                  onClick={() => handleCancleClick()}
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

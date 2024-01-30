import useCurrentUserContext from "@/hooks/useCurrentUser";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

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

  const initialValues = {
    minAge: user.preferences.ageGroupMin ?? "",
    maxAge: user.preferences.ageGroupMax ?? "",
    preferredGender: user.preferences.partnerGender ?? "",
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = (values: typeof initialValues) => {
    setEditMode(false);
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePreferenceSchema}
      onSubmit={handleSaveClick}
    >
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
        {!editMode ? (
          <div
            className="absolute right-3 -top-12 cursor-pointer hover:text-red-400"
            onClick={() => handleEditClick()}
          >
            <ModeEditIcon />
          </div>
        ) : (
          <button
            type="submit"
            className="absolute right-3 -top-12 text-sm px-4 py-2 text-white bg-red-400 dark:bg-slate-400 rounded"
          >
            Save
          </button>
        )}
      </Form>
    </Formik>
  );
};

export default UserPreferenceForm;

import { useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { ErrorMessage, Field, Formik, Form } from "formik";
//import type { PreferencesInitData } from "@/types/User";
import * as Yup from "yup";
//import useAuth from "@/hooks/useAuth";
//import { UsersService } from "@/api/users";

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
});

const initialValues = {
  phoneNumber: "",
  age: "",
  description: "",
};

const UserPreferencePage = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="mb-4 flex flex-row gap-8">
        <img
          src={user.profileImageUrl}
          alt="User"
          className="w-24 h-24 sm:w-48 sm:h-48 rounded-full mb-2"
        />
        <div>
          <p className="text-white font-Pacifico text-4xl sm:text-8xl">
            {user.firstName}
          </p>
          <p className="text-white font-Pacifico text-4xl sm:text-8xl">
            {user.lastName}
          </p>
        </div>
      </div>

      <div className="max-w-md p-6rounded shadow-md bg-[#343030]">
        <Formik
          initialValues={initialValues}
          validationSchema={updatePreferenceSchema}
          onSubmit={handleSaveClick}
        >
          <div className="  flex flex-col px-5 py-5">
            <Form className="w-full">
              <label className="block mb-2 text-white">Phone Number:</label>
              <Field
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder={user.phoneNumber}
                disabled={!editMode}
                className="w-full p-3 mb-4 border rounded"
              />
              <ErrorMessage
                component="div"
                name="phoneNumber"
                className="text-red-500"
              />
              <label className="block mb-2 text-white">Age:</label>
              <Field
                type="number"
                id="age"
                name="age"
                placeholder={user.age}
                disabled={!editMode}
                className="w-full p-3 mb-4 border rounded"
              />
              <ErrorMessage
                component="div"
                name="age"
                className="text-red-500"
              />
              <label className="block mb-2 text-white">Description:</label>
              <Field
                as="textarea"
                cols={20}
                type="string"
                id="description"
                name="description"
                placeholder={user.description}
                disabled={!editMode}
                className="w-full p-3 mb-4 border rounded"
              />
              <ErrorMessage
                component="div"
                name="description"
                className="text-red-500"
              />
            </Form>
            <div className="flex mt-6">
              <button
                onClick={handleEditClick}
                className={`px-4 py-2 ${
                  editMode
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded`}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>

              {editMode && (
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default UserPreferencePage;

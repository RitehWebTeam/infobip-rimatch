import { useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { UsersService } from "@/api/users";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import SimpleField from "@/components/forms/SimpleField";
import TagInput from "@/components/forms/TagInput";

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

type formTypes = {
  phoneNumber: string;
  age: number;
  description: string;
  favouriteSong: string;
  location: string;
  tags: string[];
};

const UserProfileForm = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();

  const handleCancleClick = () => {
    setEditMode(false);
  };

  const initialValues: formTypes = {
    phoneNumber: user.phoneNumber ?? "",
    age: user.age ?? undefined,
    description: user.description ?? "",
    favouriteSong: user.favouriteSong ?? "",
    location: user.location ?? "",
    tags: user.tags ?? [],
  };

  const handleSubmit = async (
    values: formTypes,
    helpers: FormikHelpers<formTypes>
  ) => {
    await updateUser(values);
    setEditMode(false);
    helpers.resetForm({ values });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePreferenceSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, resetForm }) => (
        <Form className="w-full flex flex-col relative gap-3">
          <div className="grid grid-cols-2 w-full gap-x-5 gap-y-2">
            <div className="flex flex-col gap-1">
              <SimpleField
                label="Phone Number:"
                name="phoneNumber"
                disabled={!editMode}
              />
            </div>
            <div className="flex flex-col gap-1">
              <SimpleField
                label="Age:"
                name="age"
                type="number"
                disabled={!editMode}
              />
            </div>
            <div className="flex flex-col gap-1">
              <SimpleField
                name="favouriteSong"
                label="Favorite song:"
                disabled={!editMode}
              />
            </div>

            <div className="flex flex-col gap-1">
              <SimpleField
                name="location"
                label="Location:"
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <SimpleField
              as="textarea"
              rows="3"
              label="Description:"
              name="description"
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <SimpleField
              name="tags"
              as={TagInput}
              disabled={!editMode}
              label={
                <>
                  Tags{" "}
                  <span className="text-sm opacity-80 text-slate-400">
                    (separate with spaces)
                  </span>
                </>
              }
            />
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

export default UserProfileForm;

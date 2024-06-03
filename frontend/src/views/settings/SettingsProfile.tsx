import * as SettingsCard from "@/components/GenericCard";
import { useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UsersService } from "@/api/users";
import SimpleField from "@/components/forms/SimpleField";
import TagInput from "@/components/forms/TagInput";
import SaveCancelButtons from "@/components/forms/SaveCancelButtons";

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

const SettingsProfile = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();

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
    <SettingsCard.Root>
      <Formik
        initialValues={initialValues}
        validationSchema={updatePreferenceSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm, submitForm }) => (
          <>
            <SettingsCard.Header title="Profile">
              <SaveCancelButtons
                editMode={editMode}
                isSubmitting={isSubmitting}
                handleCancelClick={() => handleCancleClick(resetForm)}
                handleEditClick={() => setEditMode(true)}
                handleSubmitClick={submitForm}
              />
            </SettingsCard.Header>
            <Form className="w-full flex flex-col gap-3 px-4">
              {" "}
              {/*relative*/}
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
            </Form>
          </>
        )}
      </Formik>
    </SettingsCard.Root>
  );
};

export default SettingsProfile;

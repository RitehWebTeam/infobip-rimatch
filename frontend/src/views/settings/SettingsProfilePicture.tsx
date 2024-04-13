import { UsersService } from "@/api/users";
import * as SettingsCard from "@/components/GenericCard";
import Dropzone from "@/components/forms/Dropzone";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Form, Formik, FormikHelpers } from "formik";
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  profileImageUrl: Yup.mixed<File>()
    .required("Required")
    .test("fileSize", "File size must be smaller than 500KB", (value) => {
      return value && value.size <= 500 * 1024;
    }),
});

const SettingsProfilePicture = () => {
  const user = useCurrentUserContext();
  const { mutateAsync: updateProfilePicture } =
    UsersService.useUpdateProfilePicture();

  const initialValues: UserProfileUpdateData = {
    profileImageUrl: user.profileImageUrl,
  };

  type UserProfileUpdateData = { profileImageUrl: File | string };

  const handleSubmit = async (
    values: UserProfileUpdateData,
    helpers: FormikHelpers<UserProfileUpdateData>
  ) => {
    await updateProfilePicture(values.profileImageUrl as File);
    helpers.resetForm({ values });
  };

  return (
    <SettingsCard.Root>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, touched, isSubmitting }) => (
          <>
            <SettingsCard.Header title="Profile Picture">
              <button
                type="button"
                onClick={submitForm}
                disabled={!touched.profileImageUrl}
                className="flex items-center justify-center text-sm bg-red-500 transition duration-300 ease-in-out disabled:opacity-70 disabled:hover:bg-red-500 disabled:cursor-not-allowed hover:bg-red-800 py-2 rounded-xl px-4 text-white font-semibold w-16 h-8"
              >
                {!isSubmitting ? (
                  "Save"
                ) : (
                  <CircularProgress size="1rem" color="inherit" />
                )}
              </button>
            </SettingsCard.Header>
            <Form className="py-4">
              <Dropzone name="profileImageUrl" />
            </Form>
          </>
        )}
      </Formik>
    </SettingsCard.Root>
  );
};

export default SettingsProfilePicture;

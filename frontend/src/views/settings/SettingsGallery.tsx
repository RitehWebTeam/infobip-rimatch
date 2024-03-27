import { UsersService } from "@/api/users";
import * as SettingsCard from "@/components/SettingsCard";
//import Dropzone from "@/components/forms/Dropzone";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { dataURLtoFile, toBase64 } from "@/utils";
import { /*Form,*/ Formik, FormikHelpers } from "formik";
//import { CircularProgress } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  profileImageUrl: Yup.mixed<File>()
    .required("Required")
    .test("fileSize", "File size must be smaller than 500KB", (value) => {
      return value && value.size <= 500 * 1024;
    }),
});

const SettingsGallery = () => {
  const user = useCurrentUserContext();
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();

  const initialValues = {
    profileImageUrl:
      dataURLtoFile(user.profileImageUrl, "profileImage") ?? null,
  };

  type UserProfileUpdateData = typeof initialValues;

  const handleSubmit = async (
    values: UserProfileUpdateData,
    helpers: FormikHelpers<UserProfileUpdateData>
  ) => {
    await updateUser({
      profileImageUrl: await toBase64(values.profileImageUrl!),
    });
    helpers.resetForm({ values });
  };

  return (
    <SettingsCard.Root>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <>
          <SettingsCard.Header title="Gallery"></SettingsCard.Header>
        </>
      </Formik>
    </SettingsCard.Root>
  );
};

export default SettingsGallery;

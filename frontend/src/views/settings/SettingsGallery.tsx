import * as SettingsCard from "@/components/GenericCard";
import AddCircle from "@mui/icons-material/AddCircle";
import MoreVert from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { common, amber } from "@mui/material/colors";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Form, Formik, FormikConfig } from "formik";
import * as Yup from "yup";
import Dropzone from "@/components/forms/Dropzone";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersService } from "@/api/users";
import { useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";

const newImageValidationSchema = Yup.object({
  galleryImage: Yup.mixed<File>()
    .required("Required")
    .test("fileSize", "File size must be smaller than 2 MB", (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    }),
});

interface NewImageValues {
  galleryImage?: File;
}
type NewImageOnSubmit = FormikConfig<NewImageValues>["onSubmit"];

const SettingsGallery = () => {
  const { mutate: addPhotos } = UsersService.useAddUserPhotos();
  const { mutate: removePhotos } = UsersService.useRemoveUserPhotos();
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentUser = useCurrentUserContext();

  const userImages = currentUser.photos;

  const handleSubmit: NewImageOnSubmit = (values, helpers) => {
    helpers.setSubmitting(true);
    const newImage = values.galleryImage!;
    addPhotos([newImage], {
      onSuccess: () => {
        setDialogOpen(false);
        helpers.resetForm({ values: { galleryImage: undefined } });
      },
      onSettled: () => helpers.setSubmitting(false),
    });
  };

  return (
    <SettingsCard.Root>
      <>
        <SettingsCard.Header title="Gallery">
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <NewImageDialog handleSubmit={handleSubmit} />
          </Dialog.Root>
        </SettingsCard.Header>

        <div className="grid gap-x-4 gap-y-4 grid-cols-3">
          {userImages.map((image, index) => (
            <div className="relative" key={index}>
              <img
                srcSet={image}
                className="flex-initial w-46 h-48 rounded-[1rem] object-center object-cover"
                loading="lazy"
              />

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <MoreVert
                    fontSize="medium"
                    sx={{ color: common.white }}
                    className="top-2 right-0 absolute rounded-full"
                  ></MoreVert>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="flex justify-center items-center group static outline-none bg-gray-100 py-2 px-3 rounded-md hover:bg-red-500">
                    <DropdownMenu.Item
                      className="flex text-black text-center text-sm rounded-md transition duration-300 ease-in-out group-hover:text-white outline-none"
                      asChild
                    >
                      <button
                        type="button"
                        onClick={() => removePhotos([image])}
                      >
                        Delete
                      </button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="fill-gray-100 group-hover:fill-red-500" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          ))}
        </div>
      </>
    </SettingsCard.Root>
  );
};

interface NewImageDialogProps {
  handleSubmit: NewImageOnSubmit;
}

const NewImageDialog = ({ handleSubmit }: NewImageDialogProps) => (
  <>
    <Dialog.Trigger asChild>
      <button>
        <AddCircle
          sx={{ "&:hover": { color: amber[500] } }}
          className="border-20 rounded-full"
        ></AddCircle>
      </button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
      <Dialog.Content className="fixed py-6 px-8 bg-gray-100 dark:bg-[#343030] w-100 h-100 top-2/4 left-2/4 rounded-md -translate-x-2/4 -translate-y-2/4">
        <Dialog.Close asChild>
          <button className="absolute right-2 top-2">
            <CloseIcon fontSize="small" />
          </button>
        </Dialog.Close>

        <Formik<NewImageValues>
          initialValues={{ galleryImage: undefined }}
          onSubmit={handleSubmit}
          validationSchema={newImageValidationSchema}
        >
          {({ touched, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <h2 className="text-black dark:text-white font-semibold">
                Upload a new image:
              </h2>
              <Dropzone name="galleryImage" />
              {touched.galleryImage && (
                <button
                  type="submit"
                  className="flex items-center justify-center text-sm bg-red-500 transition duration-300 ease-in-out hover:bg-red-800 py-2 rounded-xl px-4 text-white font-semibold w-full"
                >
                  {!isSubmitting ? (
                    "Upload"
                  ) : (
                    <CircularProgress size="1rem" color="inherit" />
                  )}
                </button>
              )}
            </Form>
          )}
        </Formik>
      </Dialog.Content>
    </Dialog.Portal>
  </>
);

export default SettingsGallery;

import * as SettingsCard from "@/components/GenericCard";
import GalleryDropzone from "@/components/forms/GalleryDropzone";
import AddCircle from "@mui/icons-material/AddCircle";
import MoreVert from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { common, amber } from "@mui/material/colors";
import image1 from "@/images/image1.jpg";
import image2 from "@/images/image2.jpg";
import image3 from "@/images/image3.jpg";
import image4 from "@/images/image4.jpg";
import image5 from "@/images/image5.jpg";
import image6 from "@/images/image6.jpg";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Form, Formik } from "formik";

const userImages = [image1, image2, image3, image4, image5, image6];

function handleSubmit() {
  console.log("The image is added.");
}

const SettingsGallery = () => {
  return (
    <SettingsCard.Root>
      <>
        <SettingsCard.Header title="Gallery">
          <Dialog.Root>
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
              <Dialog.Content className="fixed p-6 bg-gray-100 dark:bg-[#343030] w-100 h-100 top-2/4 left-2/4 rounded-md -translate-x-2/4 -translate-y-2/4">
                <Dialog.Close asChild>
                  <button className="absolute top-2 right-2">
                    <CloseIcon fontSize="small" />
                  </button>
                </Dialog.Close>

                <div className="justify-between flex m-0 pt-5 pb-3">
                  <div className="text-black dark:text-white font-semibold">
                    Upload an image
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex items-center justify-center text-sm bg-red-500 transition duration-300 ease-in-out hover:bg-red-800 py-2 rounded-xl px-4 text-white font-semibold w-16 h-8"
                  >
                    {" "}
                    Upload
                  </button>
                </div>

                <Formik initialValues={{ files: null }} onSubmit={handleSubmit}>
                  <Form>
                    <GalleryDropzone name="galleryImage" />
                  </Form>
                </Formik>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </SettingsCard.Header>

        <div className="grid gap-x-4 gap-y-4 grid-cols-3">
          {userImages.map((image, index) => (
            <div className="relative" key={index}>
              <img
                src={image}
                className="flex-initial w-46 h-48 rounded-[1rem]"
              />

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <MoreVert
                    fontSize="medium"
                    sx={{ color: common.white }}
                    className="top-2 right-0 absolute rounded-full hover:bg-zinc-400/40"
                  ></MoreVert>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="group static outline-none bg-gray-100 p-2 h-10 w-20 rounded-md hover:bg-red-500">
                    <DropdownMenu.Item className="flex text-black text-center text-sm pl-2 rounded-md transition duration-300 ease-in-out group-hover:text-white outline-none">
                      <button
                        type="button"
                        onClick={() =>
                          console.log("Image " + image + " is deleted.")
                        }
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

export default SettingsGallery;

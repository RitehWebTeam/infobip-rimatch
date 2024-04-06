import * as SettingsCard from "@/components/SettingsCard";
import AddCircle from "@mui/icons-material/AddCircle";
import image1 from "@/images/image1.jpg";
import image2 from "@/images/image2.jpg";
import image3 from "@/images/image3.jpg";
import image4 from "@/images/image4.jpg";
import image5 from "@/images/image5.jpg";
import image6 from "@/images/image6.jpg";
import * as Dialog from "@radix-ui/react-dialog";
import MoreVert from "@mui/icons-material/MoreVert";
import { common, amber } from "@mui/material/colors";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const userImages = [image1, image2, image3, image4, image5, image6];

function handleSubmit() {
  console.log("The image is deleted!");
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
              <Dialog.Overlay className="fixed" />

              <Dialog.Content className="fixed p-6 bg-gray-100 w-80 h-80 top-2/4 left-2/4 rounded-md -translate-x-2/4 -translate-y-2/4">
                <Dialog.Title className="m-0 text-black font-medium">
                  Upload an image
                </Dialog.Title>
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
                    <DropdownMenu.Item className="flex text-black text-center text-sm pl-2 rounded-md group-hover:text-white outline-none">
                      <button type="button" onClick={handleSubmit}>
                        {" "}
                        Delete{" "}
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

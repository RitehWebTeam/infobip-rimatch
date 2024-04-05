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
import { common } from "@mui/material/colors";

const userImages = [image1, image2, image3, image4, image5, image6];

const SettingsGallery = () => {
  return (
    <SettingsCard.Root>
      <>
        <SettingsCard.Header title="Gallery">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>
                {" "}
                <AddCircle
                  color="inherit"
                  className="border-20 rounded-full hover:bg-amber-500"
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
              <button>
                <MoreVert
                  fontSize="medium"
                  sx={{ color: common.white }}
                  className="top-2 right-0 absolute rounded-full hover:bg-zinc-400/40"
                ></MoreVert>
              </button>
            </div>
          ))}
        </div>
      </>
    </SettingsCard.Root>
  );
};

export default SettingsGallery;

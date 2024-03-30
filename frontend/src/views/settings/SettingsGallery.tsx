import * as SettingsCard from "@/components/SettingsCard";
import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import Stack from "@mui/material/Stack";
import image1 from "@/images/image1.jpg";
import image2 from "@/images/image2.jpg";
import image3 from "@/images/image3.jpg";
import image4 from "@/images/image4.jpg";
import image5 from "@/images/image5.jpg";
import image6 from "@/images/image6.jpg";

const SettingsGallery = () => {
  return (
    <SettingsCard.Root>
      <>
        <SettingsCard.Header title="Gallery">
          <Stack direction="row" spacing={2}>
            <button type="button">
              <AddCircle color="inherit"></AddCircle>
            </button>
            <button type="button">
              <RemoveCircle color="inherit"></RemoveCircle>
            </button>
          </Stack>
        </SettingsCard.Header>

        <div className="grid gap-x-4 gap-y-4 grid-cols-3">
          <div>
            <img
              src={image1}
              className="flex-initial w-46 h-48 rounded-[1rem]"
            />
          </div>
          <div>
            <img
              src={image2}
              className="flex-initial w-46 h-48 rounded-[1rem]"
            />
          </div>
          <div>
            <img
              src={image3}
              className="flex-initial w-46 h-48 rounded-[1rem]"
            />
          </div>
          <div>
            <img
              src={image4}
              className="flex-initial w-46 h-48 rounded-[1rem]"
            />
          </div>
          <div>
            <img
              src={image5}
              className="flex-initial w-46 h-48 rounded-[1rem]"
            />
          </div>
          <div>
            <img
              src={image6}
              className="flex-initial w-46 h-48 rounded-[1rem]"
            />
          </div>
        </div>
      </>
    </SettingsCard.Root>
  );
};

export default SettingsGallery;

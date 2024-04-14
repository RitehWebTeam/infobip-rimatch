import { useField } from "formik";
import { FileUploader } from "react-drag-drop-files";
import { useMemo } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const fileTypes = ["JPG", "JPEG"];

interface DropzoneProps {
  name: string;
  multiple?: boolean;
}

function Dropzone({ name, multiple = false }: DropzoneProps) {
  const [field, meta, helpers] = useField<File | string>(name);

  const setValue = async (file: File | null) => {
    helpers.setTouched(true);
    if (!file) return;
    helpers.setValue(file);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <FileUploader
        classes="focus-within:outline focus-within:outline-2 outline-slate-500 outline-offset-4 rounded-[3.5rem]"
        multiple={multiple}
        handleChange={setValue}
        name="file"
        types={fileTypes}
        dropMessageStyle={{ opactity: 0 }}
      >
        <ImageDisplay fileOrUrl={field.value} />
      </FileUploader>
      {meta.touched && (
        <div className="text-sm pl-2 text-red-500 mt-5">{meta.error}</div>
      )}
    </div>
  );
}

export default Dropzone;

interface ImageDisplayProps {
  fileOrUrl?: File | string;
  clearFile?: () => void;
}

const ImageDisplay = ({ fileOrUrl }: ImageDisplayProps) => {
  const fileUrl = useMemo(() => {
    if (typeof fileOrUrl === "string") return fileOrUrl;
    if (!fileOrUrl) return "";
    return URL.createObjectURL(fileOrUrl);
  }, [fileOrUrl]);
  return (
    <div className="relative">
      <button
        type="button"
        className="absolute right-0 bottom-0 md:text-xl z-10 w-8 h-8 md:w-10 md:h-10 cursor-pointer bg-red-600 rounded-full flex justify-center items-center text-white"
      >
        <PhotoCameraIcon fontSize="inherit" />
      </button>
      <img
        src={fileUrl}
        alt="Upload your image here"
        className="flex justify-center items-center text-center text-sm h-64 min-w-[16rem] w-[16rem] rounded-[3.5rem] object-cover border-2 border-slate-800 shadow-lg cursor-pointer"
      />
    </div>
  );
};

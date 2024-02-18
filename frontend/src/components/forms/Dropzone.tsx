import { useField } from "formik";
import { FileUploader } from "react-drag-drop-files";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const fileTypes = ["JPG", "JPEG"];

interface DropzoneProps {
  name: string;
}

function Dropzone({ name }: DropzoneProps) {
  const [field, meta, helpers] = useField(name);

  const setValue = (file: File | null) => {
    !file && helpers.setError("Required");
    helpers.setTouched(true);
    helpers.setValue(file);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      {field.value ? (
        <ImageDisplay file={field.value} clearFile={() => setValue(null)} />
      ) : (
        <>
          <FileUploader
            classes="focus-within:outline focus-within:outline-2 outline-slate-500 outline-offset-4 rounded-[3.5rem]"
            multiple={false}
            handleChange={setValue}
            name="file"
            types={fileTypes}
            maxSize={0.5}
            dropMessageStyle={{ opactity: 0 }}
          >
            <ImageDisplay />
          </FileUploader>
          {meta.touched && (
            <div className="text-sm pl-2 text-red-500 mt-5">{meta.error}</div>
          )}
        </>
      )}
    </div>
  );
}

export default Dropzone;

interface ImageDisplayProps {
  file?: File;
  clearFile?: () => void;
}

const ImageDisplay = ({ file, clearFile }: ImageDisplayProps) => {
  const fileUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );
  return (
    <div className="relative">
      {fileUrl ? (
        <button
          type="button"
          onClick={clearFile}
          className="absolute right-0 -top-2 md:text-xl z-10 bg-gray-500 w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:bg-red-600 rounded-full flex justify-center items-center text-white"
        >
          <CloseIcon fontSize="inherit" />
        </button>
      ) : (
        <button
          type="button"
          className="absolute right-0 bottom-0 md:text-xl z-10 w-8 h-8 md:w-10 md:h-10 cursor-pointer bg-red-600 rounded-full flex justify-center items-center text-white"
        >
          <PhotoCameraIcon fontSize="inherit" />
        </button>
      )}
      <img
        src={fileUrl}
        alt="Upload your profile image here"
        className="flex justify-center items-center text-center text-sm h-64 w-64 rounded-[3.5rem] bg-cover border-2 border-slate-800 shadow-lg cursor-pointer"
      />
    </div>
  );
};

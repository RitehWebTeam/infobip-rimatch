import { useField } from "formik";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "JPEG"];

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
  return field.value ? (
    <ImageDisplay file={field.value} clearFile={() => setValue(null)} />
  ) : (
    <div className="flex flex-col">
      <FileUploader
        multiple={false}
        handleChange={setValue}
        name="file"
        types={fileTypes}
        maxSize={2}
        dropMessageStyle={{ opactity: 0 }}
      />
      {meta.touched && <div className="text-red-500 mt-5">{meta.error}</div>}
    </div>
  );
}

export default Dropzone;

interface ImageDisplayProps {
  file: File;
  clearFile: () => void;
}

const ImageDisplay = ({ file, clearFile }: ImageDisplayProps) => {
  const fileUrl = URL.createObjectURL(file);
  return (
    <div className="relative">
      <div
        onClick={clearFile}
        className="absolute right-0 top-0 bg-gray-500 w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:bg-red-600 rounded-full flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <img
        src={fileUrl}
        alt="img"
        className="w-36 h-36 md:h-64 md:w-64 rounded-full bg-cover"
      />
    </div>
  );
};

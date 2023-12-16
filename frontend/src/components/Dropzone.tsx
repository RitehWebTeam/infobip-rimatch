import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function Dropzone() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_file, setFile] = useState(null);
  const handleChange = (_file: never) => {
    setFile(_file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default Dropzone;

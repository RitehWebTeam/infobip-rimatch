import {Field, Form, Formik, FormikHelpers, useField} from "formik";
import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from '@mui/icons-material/Close';
import {useMemo} from "react";

export interface ChatInputValues {
  message: string;
  image: File | null;
}

const chatValidation = Yup.object({
  message: Yup.string(),
});

interface ChatInputProps {
  handleSubmit: (values: ChatInputValues, helpers: FormikHelpers<ChatInputValues>) => void;
  initialValues: ChatInputValues;
}

const ChatInput = ({
                     handleSubmit,
                     initialValues,
                   }: ChatInputProps) => {
  const submitOnEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    submitForm: () => Promise<void>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitForm();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={chatValidation}
      onSubmit={handleSubmit}
    >
      {({submitForm, setFieldValue}) => (
        <Form
          className="flex w-full items-center p-1 dark:bg-[#242121] gap-4 pr-4 border-t border-[#E8E6EA] dark:border-[#554e4e]"
          autoComplete="off"
        >
          <div className="flex flex-col w-full">
            <ChatImageDisplay onRemove={() => setFieldValue("image", null)}/>
            <div className="flex items-center gap-4">
              <Field
                type="text"
                name="message"
                id="message"
                as="textarea"
                placeholder="Write a message..."
                className="bg-white dark:bg-[#242121] w-full resize-none p-2 text-sm sm:text-base focus-visible:outline-1 focus-visible:outline-red-500 focus-visible:outline rounded-lg h-10 sm:h-14"
                onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
                  submitOnEnter(e, submitForm)
                }
              />
              <label className="text-red-500 hover:text-opacity-80 transition-all duration-150 cursor-pointer">
                <input type="file" accept="image/*" className="hidden"
                       value={""}
                       onChange={(e) => setFieldValue("image", e.target.files[0])}/>
                <PhotoCameraIcon/>
              </label>
              <button type="submit" className="text-red-500 hover:text-opacity-80 transition-all duration-150">
                <SendIcon/>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ChatImageDisplay = ({onRemove}: { onRemove: () => void }) => {
  const [field] = useField<File | null>("image");
  const imageUrl = useMemo(() => {
    if (!field.value) return null;
    return URL.createObjectURL(field.value);
  }, [field.value]);

  if (!imageUrl) return null;
  return (
    <div className="w-full flex p-2">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Chat image"
          className="max-w-24 h-24 object-cover rounded-lg"
        />
        <button type="button" onClick={onRemove}
                className="flex justify-center items-center absolute -top-2 -right-2 bg-red-800 rounded-full h-6 w-6">
          <CloseIcon fontSize="small"/>
        </button>
      </div>
    </div>
  );
}

export default ChatInput;

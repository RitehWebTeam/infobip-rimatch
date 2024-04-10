import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
const chatValidation = Yup.object({
  message: Yup.string().required(),
});

interface ChatInputProps<T extends FormikValues> {
  handleSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  initialValues: T;
}

const ChatInput = <T extends FormikValues>({
  handleSubmit,
  initialValues,
}: ChatInputProps<T>) => {
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
      {({ submitForm }) => (
        <Form
          className="flex w-full items-center p-1 dark:bg-[#242121] gap-4 pr-4 border-t border-[#E8E6EA] dark:border-[#554e4e]"
          autoComplete="off"
        >
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
          <button type="submit" className="text-red-500">
            <SendIcon />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChatInput;

import { ErrorMessage, Field, FieldAttributes } from "formik";

type SimpleFieldProps<T> = {
  label?: string | React.ReactNode;
  showError?: boolean;
} & FieldAttributes<T>;

const SimpleField = <T,>({
  children,
  label,
  name,
  showError = true,
  ...props
}: SimpleFieldProps<T>) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        name={name}
        {...props}
        className={
          props.className ??
          "w-full focus-visible:outline outline-2 outline-red-400 rounded-[10px] px-5 py-3 bg-gray-100 border border-slate-300 dark:border-gray-300 dark:text-gray-900 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        }
      >
        {children}
      </Field>
      {showError && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-sm pl-2 text-red-500"
        />
      )}
    </>
  );
};

export default SimpleField;

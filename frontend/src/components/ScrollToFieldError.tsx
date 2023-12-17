import { useFormikContext } from "formik";
import { MutableRefObject, useEffect } from "react";

interface ScrollToFieldErrorProps<T extends string | number | symbol> {
  pageRefs: MutableRefObject<Record<number, HTMLDivElement>>;
  inputPageLocation: Record<T, number>;
}

const ScrollToFieldError = <TValues extends { [key: string]: unknown }>({
  pageRefs,
  inputPageLocation,
}: ScrollToFieldErrorProps<keyof TValues>) => {
  const { submitCount, isValid, errors } = useFormikContext<TValues>();

  useEffect(() => {
    if (isValid || !submitCount) return;

    const mappedErrorsArray = (
      Object.keys(errors) as Array<keyof typeof errors>
    ).map((key) => {
      const page = inputPageLocation[key];
      return { error: key, page };
    });
    const errorWithLowestPage = mappedErrorsArray.reduce((prev, curr) => {
      return curr.page < prev.page ? curr : prev;
    });

    const page = errorWithLowestPage.page;
    const pageRef = pageRefs.current[page];
    if (!pageRef) return;

    pageRef.scrollIntoView({ behavior: "smooth" });

    // Disable eslint because we only want to trigger on submitCount change
  }, [submitCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default ScrollToFieldError;

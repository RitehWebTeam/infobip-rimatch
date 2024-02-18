import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { CircularProgress } from "@mui/material";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

interface FormikStepperProps<T> extends FormikConfig<T> {
  children: React.ReactNode;
}

export function FormikStepper<Values extends FormikValues>({
  children,
  ...props
}: FormikStepperProps<Values>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form
          autoComplete="off"
          className="flex flex-col justify-between gap-10 sm:gap-4 h-full w-full sm:w-5/6"
        >
          <div>
            <div className="mb-6 min-h-[3rem] flex items-center -ml-2">
              {step > 0 && (
                <button
                  type="button"
                  className="p-0.5 rounded-lg border border-red-500 font-semibold shadow-xl"
                  disabled={isSubmitting}
                  onClick={() => setStep((s) => s - 1)}
                >
                  <KeyboardArrowLeftIcon fontSize="large"></KeyboardArrowLeftIcon>
                </button>
              )}
            </div>
            <div className="text-white text-3xl sm:text-4xl font-bold mb-8">
              Setup your profile
            </div>
            <div className="w-full h-4 bg-red-50 mt-3 mb-6 rounded-2xl">
              <div
                className="h-full bg-red-500 rounded-2xl transition-all duration-200 ease-in-out"
                style={{
                  width: `${((step + 1) / childrenArray.length) * 100}%`,
                }}
              ></div>
            </div>
            {currentChild}
          </div>

          <div className="flex w-full mt-4 gap-3">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-red-500 flex-1 disabled:bg-red-700 hover:bg-red-700 px-6 py-2 sm:py-3 rounded-2xl text-white font-semibold"
            >
              {isSubmitting ? (
                <CircularProgress size="1rem" color="inherit" />
              ) : isLastStep() ? (
                "Submit"
              ) : (
                "Next"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

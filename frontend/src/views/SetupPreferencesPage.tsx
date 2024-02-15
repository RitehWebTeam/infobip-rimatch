import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const initialValues = {
  description: "",
  profileImageUrl: "",
  phoneNumber: "",
  location: "",
  favouriteSong: "",
  preferences: {
    ageGroupMin: "",
    ageGroupMax: "",
    partnerGender: "",
  },
};

type SetupPreferencesValues = typeof initialValues;

const Step1ValidationSchema = Yup.object({
  phoneNumber: Yup.number()
    .required("Required")
    .min(111111111, "Please input a valid phone number"),
  preferences: Yup.object({
    partnerGender: Yup.string().required("Required"),
  }),
});

const Step2ValidationSchema = Yup.object({
  preferences: Yup.object({
    ageGroupMin: Yup.number().required("Required"),
    ageGroupMax: Yup.number().required("Required"),
  }),
});

const Step3ValidationSchema = Yup.object({
  location: Yup.string()
    .required("Required")
    .min(3, "Location name must be longer than 2 characters"),
  description: Yup.string().required("Required"),
});

const SetupPreferencesPage = () => {
  return (
    <PreferencesHeader>
      <FormikStepper<SetupPreferencesValues>
        initialValues={initialValues}
        onSubmit={async (values) => {
          await sleep(3000);
          console.log("values", values);
        }}
      >
        <FormikStep
          label="Description & Preffered gender"
          validationSchema={Step1ValidationSchema}
        >
          <div className="flex flex-col gap-6 font-Montserrat">
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber">Input you phone number</label>
              <Field
                type="string"
                name="phoneNumber"
                id="phoneNumber"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
                placeholder="091 999 999"
              />
              <ErrorMessage
                component="div"
                name="phoneNumber"
                className="text-sm pl-2 text-red-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-Montserrat"
                htmlFor="preferences.partnerGender"
              >
                Choose your preffered gender
              </label>

              <Field
                name="preferences.partnerGender"
                id="preferences.partnerGender"
                as="select"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
              >
                <option value="" disabled hidden>
                  Choose a Gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Field>
              <ErrorMessage
                component="div"
                name="preferences.partnerGender"
                className="text-sm pl-2 text-red-500"
              />
            </div>
          </div>
        </FormikStep>
        <FormikStep label="Age range" validationSchema={Step2ValidationSchema}>
          <div className="flex flex-col gap-6 font-Montserrat">
            <div className="flex flex-col gap-2">
              <label htmlFor="preferences.ageGroupMin">
                Minimum partner age
              </label>
              <Field
                type="number"
                name="preferences.ageGroupMin"
                id="preferences.ageGroupMin"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
                placeholder="18 - 99"
              />
              <ErrorMessage
                component="div"
                name="preferences.ageGroupMin"
                className="text-sm pl-2 text-red-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-Montserrat"
                htmlFor="preferences.ageGroupMax"
              >
                Maximum partner age
              </label>

              <Field
                type="number"
                placeholder="18 - 99"
                name="preferences.ageGroupMax"
                id="preferences.ageGroupMax"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
              ></Field>
              <ErrorMessage
                component="div"
                name="preferences.ageGroupMax"
                className="text-sm pl-2 text-red-500"
              />
            </div>
          </div>
        </FormikStep>
        <FormikStep
          label="Location & Description"
          validationSchema={Step3ValidationSchema}
        >
          <div className="flex flex-col gap-6 font-Montserrat">
            <div className="flex flex-col gap-2">
              <label htmlFor="location">Where are you from?</label>
              <Field
                type="text"
                name="location"
                id="location"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
                placeholder="Please input your location"
              />
              <ErrorMessage
                component="div"
                name="location"
                className="text-sm pl-2 text-red-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-Montserrat" htmlFor="description">
                Tell us about yourself:
              </label>

              <Field
                as="textarea"
                rows="4"
                placeholder="I like bees"
                name="description"
                id="description"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
              ></Field>
              <ErrorMessage
                component="div"
                name="description"
                className="text-sm pl-2 text-red-500"
              />
            </div>
          </div>
        </FormikStep>
      </FormikStepper>
    </PreferencesHeader>
  );
};

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

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off" className="w-5/6">
          <div className="w-full h-4 bg-red-50 mb-5 rounded-2xl">
            <div
              className="h-full bg-red-500 rounded-2xl transition-all duration-200 ease-in-out"
              style={{
                width: `${((step + 1) / childrenArray.length) * 100}%`,
              }}
            ></div>
          </div>

          {currentChild}

          <div className="flex w-full mt-4 gap-3">
            {step > 0 ? (
              <button
                type="button"
                className="px-6 py-2 flex-1 bg-black rounded-2xl font-semibold hover:bg-gray-800"
                disabled={isSubmitting}
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </button>
            ) : null}
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-red-500 flex-1 hover:bg-red-800 px-6 py-2 sm:py-3 rounded-2xl text-white font-semibold"
            >
              {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

interface PreferencesHeaderProps {
  children: React.ReactNode;
}

const PreferencesHeader = ({ children }: PreferencesHeaderProps) => {
  return (
    <div
      className="flex flex-col justify-center items-center flex-grow"
      id="red-to-black"
    >
      <div className="flex w-full flex-grow justify-center md:pb-8 max-h-[40rem]">
        <div className="bg-white dark:bg-[#343030] flex w-[30rem] flex-col h-full items-center px-10 py-7 sm:rounded-lg shadow-lg shadow-black">
          <div className="flex w-full items-start gap-5 mb-6">
            <div className="text-black dark:text-red-500 text-4xl font-bold leading-[51px] grow shrink basis-auto">
              Setup your profile
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SetupPreferencesPage;

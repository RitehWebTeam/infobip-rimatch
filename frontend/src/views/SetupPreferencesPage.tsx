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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { CircularProgress } from "@mui/material";
import TagInput from "@/components/TagInput";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const initialValues = {
  description: "",
  profileImageUrl: "",
  phoneNumber: "",
  location: "",
  favouriteSong: "",
  tags: [],
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
  location: Yup.string()
    .required("Required")
    .min(3, "Location name must be longer than 2 characters"),
  description: Yup.string().required("Required"),
});

const Step2ValidationSchema = Yup.object({
  preferences: Yup.object({
    ageGroupMin: Yup.number()
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    ageGroupMax: Yup.number()
      .when("ageGroupMin", ([ageGroupMin], schema) =>
        ageGroupMin
          ? schema.min(ageGroupMin, "Max age must be greater than min age")
          : schema
      )
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    partnerGender: Yup.string().required("Required"),
  }),
});

const Step3ValidationSchema = Yup.object({
  favouriteSong: Yup.string().required("Required"),
  tags: Yup.array()
    .of(Yup.string().required("This field is required"))
    .min(1, "At least one tag is required"),
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
          label="Description, Location, Phonenumber"
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
                placeholder="I like bees..."
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
        <FormikStep
          label="Preferences"
          validationSchema={Step2ValidationSchema}
        >
          <div className="flex flex-col gap-6 font-Montserrat">
            <div className="flex flex-col gap-2">
              <label
                className="font-Montserrat"
                htmlFor="preferences.partnerGender"
              >
                Preffered gender:
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
        <FormikStep label="Tags, Song" validationSchema={Step3ValidationSchema}>
          <div className="flex flex-col gap-6 font-Montserrat">
            <div className="flex flex-col gap-2">
              <label htmlFor="favouriteSong">What is your favorite song?</label>
              <Field
                type="string"
                name="favouriteSong"
                id="favouriteSong"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
                placeholder="Input your favorite song"
              />
              <ErrorMessage
                component="div"
                name="favouriteSong"
                className="text-sm pl-2 text-red-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tags">
                Enter some tags:
                <span className="text-sm block opacity-80 text-slate-400">
                  (separate with spaces)
                </span>
              </label>
              <TagInput
                name="tags"
                className="rounded-2xl px-5 py-3 bg-gray-100 text-black"
              />
              <ErrorMessage
                component="div"
                name="tags"
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

interface PreferencesHeaderProps {
  children: React.ReactNode;
}

const PreferencesHeader = ({ children }: PreferencesHeaderProps) => {
  return (
    <div
      className="flex flex-col justify-center items-center flex-grow"
      id="red-to-black"
    >
      <div className="flex w-full flex-grow justify-center md:pb-8 sm:max-h-[50rem]">
        <div className="bg-white dark:bg-[#343030] flex w-[30rem] flex-col h-full items-center px-10 py-8 sm:rounded-lg shadow-lg shadow-black min-h-fit">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SetupPreferencesPage;

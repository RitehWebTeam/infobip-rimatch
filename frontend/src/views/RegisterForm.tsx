import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import MaleIcon from "@mui/icons-material/Male";
import BoyIcon from "@mui/icons-material/Boy";
import PersonIcon from "@mui/icons-material/Person";
import { EmailAtIcon, LockIcon } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "@/api/auth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { AxiosError } from "axios";
const RegisterSchema = Yup.object({
  email: Yup.string().required("Required").email("Must be a valid email"),
  password: Yup.string()
    .max(30, "Must be 30 characters or less")
    .min(8, "Password must be 8 characters or more")
    .required("Required"),
  firstName: Yup.string()
    .required("Required")
    .max(30, "Name be 30 characters or less")
    .min(2, "Name be longer then 2 characters"),
  lastName: Yup.string()
    .required("Required")
    .max(30, "Surname be 30 characters or less")
    .min(2, "Surname be longer then 2 characters"),
  gender: Yup.string().required("Required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Required")
    .min(18, "You must be 18 or older")
    .max(99, "You must be 99 or younger"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
  gender: "",
  age: "",
};

type RegisterValues = typeof initialValues;

const RegisterForm = () => {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const { mutate: register } = AuthService.useRegister();

  const handleSubmit = async (
    values: RegisterValues,
    helpers: FormikHelpers<RegisterValues>
  ) => {
    helpers.setSubmitting(true);
    setRegisterError("");
    const registerData = {
      ...values,
      age: parseInt(values.age, 10),
    };
    register(registerData, {
      onSuccess: () => navigate("/login"),
      onError: (error) => {
        let errorMessage = "Something went wrong";
        if (error instanceof AxiosError) {
          // The `error.response.data` is an object with the key being the field name
          // example { email: "Email already exists" }
          errorMessage = Object.values(error.response?.data)?.join(" ");
        }
        setRegisterError(errorMessage);
      },
      onSettled: () => {
        helpers.setSubmitting(false);
      },
    });
  };

  return (
    <RegisterFormHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
        validate={() => {
          setRegisterError("");
        }}
      >
        {({ isSubmitting }) => (
          <Form
            aria-autocomplete="none"
            className="sm:w-2/3 w-full px-4 lg: mx-auto  rounded-xl shadow-black drop-shadow-2xl"
            autoComplete=""
          >
            {/*NAME*/}
            <div className="flex bg-white items-center border-2 py-4 px-4 rounded-2xl ">
              <BoyIcon color="action" fontSize="medium" />

              <Field
                className="pl-2 text-black outline-none border-none bg-white w-full "
                type="text"
                id="firstName"
                placeholder="Name"
                name="firstName"
              />
            </div>
            <ErrorMessage
              component="div"
              name="firstName"
              className="text-red-500 text-sm text-left pl-2"
            />
            {/*SURNAME*/}
            <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
              <PersonIcon color="action" />

              <Field
                className="pl-2 text-black bg-white outline-none border-none w-full"
                type="text"
                id="lastName"
                placeholder="Surname"
                name="lastName"
              />
            </div>
            <ErrorMessage
              component="div"
              name="lastName"
              className="text-red-500 text-sm text-left pl-2"
            />
            {/*Gender*/}
            <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
              <MaleIcon color="action" />

              <Field
                as="select"
                className="pl-2 text-black bg-white outline-none border-none w-full"
                id="gender"
                name="gender"
              >
                <option value="" disabled>
                  Choose your gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Field>
            </div>
            <ErrorMessage
              component="div"
              name="gender"
              className="text-red-500 text-sm text-left pl-2"
            />
            {/*Age*/}
            <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
              <DateRangeIcon color="action" />

              <Field
                className="pl-2 text-black bg-white outline-none border-none w-full"
                id="age"
                type="text"
                placeholder="Age"
                name="age"
              />
            </div>
            <ErrorMessage
              component="div"
              name="age"
              className="text-red-500 text-sm text-left pl-2"
            />
            {/*EMAIL*/}
            <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
              <EmailAtIcon />

              <Field
                className="pl-2 text-black bg-white outline-none border-none w-full"
                type="text"
                id="email"
                placeholder="Email"
                name="email"
              />
            </div>
            <ErrorMessage
              component="div"
              name="email"
              className="text-red-500 text-sm text-left pl-2"
            />

            {/*PASSWORD*/}
            <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
              <LockIcon />

              <Field
                className="pl-2 text-black bg-white outline-none border-none w-full"
                type="Password"
                id="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <ErrorMessage
              component="div"
              name="password"
              className="text-red-500 text-sm text-left pl-2"
            />
            {/*CONFIRM PASSWORD*/}
            <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
              <LockIcon />

              <Field
                className="pl-2 text-black bg-white outline-none border-none w-full"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
              />
            </div>
            <ErrorMessage
              component="div"
              name="confirmPassword"
              className="text-red-500 text-sm text-left pl-2"
            />
            {registerError && (
              <div className="text-red-500 text-left text-sm pl-2 mt-2">
                {registerError}
              </div>
            )}
            <div className="mt-6">
              <button
                disabled={isSubmitting}
                type="submit"
                className="block w-full bg-red-600  transition duration-300 ease-in-out hover:bg-red-800 mt-4 py-3 rounded-2xl text-white font-semibold"
              >
                {!isSubmitting ? (
                  "Register"
                ) : (
                  <CircularProgress size="1rem" color="inherit" />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </RegisterFormHeader>
  );
};

interface RegisterFormHeaderProps {
  children: React.ReactNode;
}

const RegisterFormHeader = ({ children }: RegisterFormHeaderProps) => (
  <div id="red-to-black">
    <div className="min-h-screen flex items-stretch text-white">
      <div className="w-full h-full flex items-center justify-center text-center md:px-16 px-0 z-0">
        <div className="py-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 z-20">
          <h1 className="text-white font-bold text-5xl mb-2 font-Pacifico">
            RiMatch
          </h1>
          <h2 className="text-xl font-normal dark:text-gray-200">
            Register your new account
          </h2>
          <p className="text-sm mt-2 dark:text-gray-200 mb-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 hover:text-red-700 font-bold"
            >
              Login here!
            </Link>
          </p>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default RegisterForm;

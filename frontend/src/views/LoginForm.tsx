import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { EmailAtIcon, LockIcon } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthService from "@/api/auth";

const LoginSchema = Yup.object({
  email: Yup.string().required("Required").email("Must be valid email"),
  password: Yup.string()
    .max(16, "Must be 16 characters or less")
    .required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};
type LoginValues = typeof initialValues;

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: login } = AuthService.useLogin();
  const from = location?.state?.from?.pathname ?? "/";

  const handleSubmit = (values: LoginValues) => {
    return login(values, {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <div>
      <div className="h-screen flex text-white" id="red-to-black">
        <div className="flex w-full justify-center items-center ">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className=" sm:w-1/2 md:w-1/3 lg:w-1/4   rounded-xl shadow-black drop-shadow-2xl">
                <h1 className="text-white-800 text-center font-bold text-3xl  mb-2 font-Pacifico">
                  RiMatch
                </h1>
                <p className="text-sm sm:text-base md:text-lg font-normal text-center text-white-600 mb-7">
                  Welcome Back
                </p>
                <div className="flex items-center bg-white border-2 py-2 sm:py-3 px-2 sm:px-4 rounded-2xl mt-4 sm:mt-6">
                  <EmailAtIcon />
                  <Field
                    className="pl-2 text-black outline-none border-none bg-white w-full"
                    type="text"
                    id="email"
                    placeholder="Email address"
                    name="email"
                  />
                </div>
                <ErrorMessage
                  component="div"
                  name="email"
                  className="text-red-500"
                />
                <div className="flex items-center bg-white border-2 py-2 sm:py-3 px-2 sm:px-4 rounded-2xl mt-4 sm:mt-6">
                  <LockIcon />
                  <Field
                    className="pl-2 text-black bg-white outline-none border-none w-full"
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <ErrorMessage
                  component="div"
                  name="password"
                  className="text-red-500"
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="block w-full bg-red-600 transition duration-300 ease-in-out hover:bg-red-800 mt-4 py-2 sm:py-3 rounded-2xl text-white font-semibold"
                >
                  Login
                </button>
                <span className="text-sm sm:text-base text-white ml-2 flex my-3 justify-center hover:text-gray-500 cursor-pointer">
                  Forgot Password ?
                </span>
                <p className="text-xs sm:text-sm md:text-base w-full text-center py-3">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    Sign up here!
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { EmailAtIcon, LockIcon } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthService from "@/api/auth";
import useAuth from "@/hooks/useAuth";

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
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: login } = AuthService.useLogin();
  const from = location?.state?.from?.pathname ?? "/";

  const handleSubmit = (values: LoginValues) => {
    return login(values, {
      onSuccess: ({ token }) => {
        setAuth({
          user: {
            email: values.email,
          },
          accessToken: token,
        });
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <div>
      {/*Crveni blok*/}
      <div className="h-screen flex">
        <div className="flex w-1/2 bg-gradient-to-bl from-red-600 to-red-900 i justify-around items-center">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">RiMatch</h1>
            <p className="text-white mt-1">
              The most popular platform for finding your soulmate
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
        </div>

        <div className="flex w-2/4 justify-center items-center bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white p-8">
                <h1 className="text-gray-800 font-bold text-5xl mb-2">
                  Hello Again!
                </h1>
                <p className="text-lg font-normal text-gray-600 mb-7">
                  Welcome Back
                </p>
                <div className="flex items-center border-2 py-3 px-4 rounded-2xl ">
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
                <div className="flex items-center border-2 py-3 px-4 rounded-2xl mt-6 ">
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
                  className="block w-full bg-red-600  transition duration-300 ease-in-out hover:bg-red-800 mt-4 py-3 rounded-2xl text-white font-semibold "
                >
                  Login
                </button>
                <span className="text-base text-black ml-2 flex my-3 justify-center hover:text-gray-500 cursor-pointer">
                  Forgot Password ?
                </span>
                <p className="text-sm text-black w-full text-center py-3">
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

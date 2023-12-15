import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { EmailAtIcon, LockIcon } from "../assets";

const LoginSchema = Yup.object({
  email: Yup.string().required("Required").email("Must be valid email"),
  password: Yup.string()
    .max(16, "Must be 16 characters or less")
    .required("Required"),
});

const LoginForm = () => {
  return (
    <div>
      <div className="h-screen flex" id="red-to-black">
        <div className="flex w-full justify-center items-center ">
          <Formik
            //!Forma i validacija
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            //Ovo je meni iz projekta radilo za slanje u bazu, slobodno promijeniti po potrebi
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {() => (
              <Form className="w-1/4 rounded-xl  shadow-black drop-shadow-2xl ">
                <h1 className="text-white-800 text-center font-bold text-5xl mb-2 font-Pacifico">
                  RiMatch
                </h1>
                <p className="text-lg font-normal text-center text-white-600 mb-7">
                  Welcome Back
                </p>
                <div className="flex items-center bg-white border-2 py-3 px-4 rounded-2xl mt-6 ">
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
                <div className="flex items-center bg-white border-2 py-3 px-4 rounded-2xl mt-6 ">
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
                  type="submit"
                  className="block w-full bg-red-600  transition duration-300 ease-in-out hover:bg-red-800 mt-4 py-3 rounded-2xl text-white font-semibold "
                >
                  Login
                </button>
                <span className="text-base text-white ml-2 flex justify-center hover:text-gray-500 cursor-pointer">
                  Forgot Password ?
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BoyIcon from "@mui/icons-material/Boy";
import PersonIcon from "@mui/icons-material/Person";
import { EmailAtIcon, LockIcon } from "../assets";

const RegisterSchema = Yup.object({
  email: Yup.string().required("Required").email("Must be a valid email"),
  password: Yup.string()
    .max(16, "Must be 16 characters or less")
    .min(8, "Password must be 8 characters or more")
    .required("Required"),
  name: Yup.string()
    .required("Required")
    .max(30, "Name be 30 characters or less")
    .min(2, "Name be longer then 2 characters"),
  surname: Yup.string()
    .required("Required")
    .max(30, "Surname be 30 characters or less")
    .min(2, "Surname be longer then 2 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  phoneNumber: Yup.number().required("Required"),
});

const RegisterForm = () => {
  return (
    <div id="red-to-black">
      {" "}
      <div className=" min-h-screen flex items-stretch text-white ">
        <div className=" lg:w-full  h-screen flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div className="py-6 w-1/2 z-20">
            <h1 className="text-white font-bold text-5xl mb-2">RiMatch</h1>
            <h1 className="text-lg font-normal text-gray-200 mb-7">
              Register your new account
            </h1>
            <Formik
              //!Forma i validacija
              initialValues={{
                email: "",
                password: "",
                name: "",
                surname: "",
                confirmPassword: "",
                phoneNumber: "",
              }}
              validationSchema={RegisterSchema}
              //Ovo je meni iz projekta radilo za slanje u bazu, slobodno promijeniti po potrebi
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 6));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {(formik) => (
                <Form
                  onSubmit={formik.handleSubmit}
                  className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
                >
                  {/*NAME*/}
                  <div className="flex bg-white items-center border-2 py-4 px-4 rounded-2xl ">
                    <BoyIcon color="action" fontSize="medium" />

                    <Field
                      className="pl-2 text-black outline-none border-none bg-white w-full"
                      type="text"
                      id="name"
                      placeholder="Name"
                      name="name"
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="text-red-500"
                  />
                  {/*SURNAME*/}
                  <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
                    <PersonIcon color="action" />

                    <Field
                      className="pl-2 text-black bg-white outline-none border-none w-full"
                      type="text"
                      id="surname"
                      placeholder="Surname"
                      name="surname"
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    name="surname"
                    className="text-red-500"
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
                    className="text-red-500"
                  />
                  {/*PHONE NUMBER*/}
                  <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
                    <LocalPhoneIcon color="action" />
                    <Field
                      className="pl-2 text-black bg-white outline-none border-none w-full"
                      type="tel"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      name="phoneNumber"
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    name="phoneNumber"
                    className="text-red-500"
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
                    className="text-red-500"
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
                    className="text-red-500"
                  />
                  <div className="px-4 pb-2 pt-4">
                    <button
                      type="submit"
                      className="block w-full bg-[#df4444]  transition duration-300 ease-in-out hover:bg-red-800 mt-4 py-3 rounded-2xl text-white font-semibold "
                    >
                      Register
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

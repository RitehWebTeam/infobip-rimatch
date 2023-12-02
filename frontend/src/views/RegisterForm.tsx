/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BoyIcon from "@mui/icons-material/Boy";
import PersonIcon from "@mui/icons-material/Person";
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
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("Required")
                  .email("Must be a valid email"),
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
              })}
              //Ovo je meni iz projekta radilo za slanje u bazu, slobodno promijeniti po potrebi
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 6));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
                >
                  {/*NAME*/}
                  <div className="flex bg-white items-center border-2 py-4 px-4 rounded-2xl ">
                    <BoyIcon color="action" fontSize="medium" />

                    <input
                      className="pl-2 text-black outline-none border-none bg-white w-full"
                      type="text"
                      id="name"
                      placeholder="Name"
                      {...formik.getFieldProps("name")}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                  ) : null}
                  {/*SURNAME*/}
                  <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
                    <PersonIcon color="action" />

                    <input
                      className="pl-2 text-black bg-white outline-none border-none w-full"
                      type="text"
                      id="surname"
                      placeholder="Surname"
                      {...formik.getFieldProps("surname")}
                    />
                  </div>
                  {formik.touched.surname && formik.errors.surname ? (
                    <div className="text-red-500">{formik.errors.surname}</div>
                  ) : null}
                  {/*EMAIL*/}
                  <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>

                    <input
                      className="pl-2 text-black bg-white outline-none border-none w-full"
                      type="text"
                      id="email"
                      placeholder="Email"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                  {/*PHONE NUMBER*/}
                  <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
                    <LocalPhoneIcon color="action" />
                    <input
                      className="pl-2 text-black bg-white outline-none border-none w-full"
                      type="tel"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      {...formik.getFieldProps("phoneNumber")}
                    />
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-red-500">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                  {/*PASSWORD*/}
                  <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <input
                      className="pl-2 text-black bg-white outline-none border-none w-full"
                      type="Password"
                      id="password"
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                  {/*CONFIRM PASSWORD*/}
                  <div className="flex items-center border-2 py-4 px-4 bg-white rounded-2xl mt-6 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <input
                      className="pl-2 text-black bg-white outline-none border-none w-full"
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      {...formik.getFieldProps("confirmPassword")}
                    />
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}

                  <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                    <a href="#">Forgot your password?</a>
                  </div>
                  <div className="px-4 pb-2 pt-4">
                    <button
                      type="submit"
                      className="block w-full bg-[#df4444]  transition duration-300 ease-in-out hover:bg-red-800 mt-4 py-3 rounded-2xl text-white font-semibold "
                    >
                      Register
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

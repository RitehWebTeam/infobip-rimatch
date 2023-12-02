/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Formik} from "formik";
import * as Yup from "yup";

const LoginForm = () => {
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
            //!Forma i validacija
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required("Required")
                .email("Must be valid email"),
              password: Yup.string()
                .max(16, "Must be 16 characters or less")
                .required("Required"),
            })}
            //Ovo je meni iz projekta radilo za slanje u bazu, slobodno promijeniti po potrebi
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {(formik) => (
              <form className="bg-white p-8" onSubmit={formik.handleSubmit}>
                <h1 className="text-gray-800 font-bold text-5xl mb-2">
                  Hello Again!
                </h1>
                <p className="text-lg font-normal text-gray-600 mb-7">
                  Welcome Back
                </p>
                <div className="flex items-center border-2 py-3 px-4 rounded-2xl ">
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
                    className="pl-2 text-black outline-none border-none bg-white w-full"
                    type="text"
                    id="email"
                    placeholder="Email address"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
                <div className="flex items-center border-2 py-3 px-4 rounded-2xl mt-6 ">
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
                    id="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
                <button
                  type="submit"
                  className="block w-full bg-red-600  transition duration-300 ease-in-out hover:bg-red-800 mt-4 py-3 rounded-2xl text-white font-semibold "
                >
                  Login
                </button>
                <span className="text-base text-black ml-2 flex justify-center hover:text-gray-500 cursor-pointer">
                  Forgot Password ?
                </span>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

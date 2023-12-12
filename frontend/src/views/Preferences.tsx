import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
const Preferences = () => {
  const preferenceSchema = Yup.object({
    userAge: Yup.number()
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    minAge: Yup.number()
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
    maxAge: Yup.number()
      .required("Required")
      .max(99, "Age must be between 18 and 99")
      .min(18, "Age must be between 18 and 99"),
  });
  return (
    <div id="all">
      <Formik
        //!Forma i validacija
        initialValues={{
          userAge: "",
          minAge: "",
          maxAge: "",
          userGender: "",
          preferredGender: "",
        }}
        validationSchema={preferenceSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 3)); //TODO Ovo je za test samo
            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formikPreference) => (
          <Form onSubmit={formikPreference.handleSubmit}>
            <div id="page1" className="page">
              {/*Gender select*/}
              <div className="page flex flex-col items-center w-full">
                <div className="flex flex-col  mt-4">
                  <div className=" mb-16">
                    <div className="relative  text-left flex flex-col">
                      <label
                        className="text-black text-center  mb-4"
                        htmlFor="gender"
                      >
                        Choose your gender
                      </label>

                      <Field
                        as="select"
                        name="userGender"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full  p-2.5"
                      >
                        <option value="default">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                    </div>
                  </div>
                  <div className="mt-16">
                    <div className="relative ">
                      <label
                        className="text-black  text-center"
                        htmlFor="gender"
                      >
                        Choose your preferred gender
                      </label>

                      <Field
                        name="preferredGender"
                        id="preferredGender"
                        as="select"
                        className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option value="default">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <a
                  className="text-gray-300 absolute bottom-0 bg-[#00000042] rounded-full mb-4 px-5 py-3 text-center hover:opacity-75 transition-opacity duration-300"
                  href="#page2"
                >
                  Next
                </a>
              </div>
            </div>
            {/*age select*/}
            <div className="page" id="page2">
              <a
                href="#page1"
                className="text-gray-300 absolute top-0 bg-[#00000042] rounded-full mt-4 px-5 py-3 text-center hover:opacity-75 transition-opacity duration-300"
              >
                Previous
              </a>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col">
                  <label className="text-black text-center" htmlFor="userAger">
                    Your Age
                  </label>
                  <Field
                    type="number"
                    id="userAge"
                    placeholder="18 - 99"
                    name="userAge"
                    className="rounded-2xl px-5 py-2"
                  />
                  <ErrorMessage
                    component="div"
                    name="userAge"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col my-16">
                  <label className="text-black text-center" htmlFor="minAge">
                    Minimum partner Age
                  </label>
                  <Field
                    type="number"
                    id="minAge"
                    placeholder="18 - 99"
                    name="minAge"
                    className="rounded-2xl px-5 py-2"
                  />
                  <ErrorMessage
                    component="div"
                    name="minAge"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col ">
                  <label className="text-black text-center" htmlFor="maxAge">
                    Maximum partner age
                  </label>
                  <Field
                    type="number"
                    id="maxAge"
                    placeholder="18 - 99"
                    name="maxAge"
                    className="rounded-2xl px-5 py-2 w-80"
                  />
                  <ErrorMessage
                    component="div"
                    name="maxAge"
                    className="text-red-500"
                  />
                </div>
                <div className="flex justify-center">
                  <a
                    href="#page3"
                    className="text-gray-300 absolute bottom-0 bg-[#00000042] rounded-full mb-4 px-5 py-3 text-center hover:opacity-75 transition-opacity duration-300"
                  >
                    Next
                  </a>
                </div>
              </div>
            </div>
            {/*upload picture*/}
            <div className="page flex flex-col justify-center" id="page3">
              <a
                href="#page2"
                className="text-gray-300 absolute top-0 bg-[#00000042] rounded-full mt-4 px-5 py-3 text-center hover:opacity-75 transition-opacity duration-300"
              >
                Previous
              </a>
              <div>
                <h1 className="flex">Upload some pictures for your account</h1>
                <input type="file" />
              </div>
              <div>
                <button className="mt-24" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Preferences;

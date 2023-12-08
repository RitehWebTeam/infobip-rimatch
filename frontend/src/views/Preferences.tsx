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
            <div
              id="page1"
              className="page flex items-center justify-center h-screen"
            >
              <div className="page flex flex-col items-center w-5">
                Page 1,
                <a className="text-black" href="#page2">
                  page 2
                </a>
                <div className="flex flex-row mt-4 justify-between ">
                  <div className="ml-12">
                    <div className="relative inline-block text-left">
                      <label className="text-black" htmlFor="gender">
                        Choose your gender
                      </label>

                      <Field name="userGender" id="userGender" as="select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                    </div>
                  </div>
                  <div className="ml-2">
                    <label className="text-black" htmlFor="gender">
                      Choose your preferred gender
                    </label>

                    <Field
                      name="preferredGender"
                      id="preferredGender"
                      as="select"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                  </div>
                  <button className="text-white bg-black mr-10">Next</button>
                </div>
              </div>
            </div>
            <div className="page" id="page2">
              Page 2<a href="#page3">Next</a>
              <div className="flex justify-center">
                <div>
                  <label className="text-black" htmlFor="userAger">
                    Your Age
                  </label>
                  <Field
                    type="number"
                    id="userAge"
                    placeholder="18 - 99"
                    name="userAge"
                  />
                  <ErrorMessage
                    component="div"
                    name="userAge"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label className="text-black" htmlFor="minAge">
                    Minimum partner Age
                  </label>
                  <Field
                    type="number"
                    id="minAge"
                    placeholder="18 - 99"
                    name="minAge"
                  />
                  <ErrorMessage
                    component="div"
                    name="minAge"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label className="text-black" htmlFor="maxAge">
                    Maximum partner age
                  </label>
                  <Field
                    type="number"
                    id="maxAge"
                    placeholder="18 - 99"
                    name="maxAge"
                  />
                  <ErrorMessage
                    component="div"
                    name="maxAge"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="page" id="page3">
              <h1>Upload some pictures for your account</h1>
              <input type="file" />
              Page 3<a href="#page1">Next</a>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Preferences;

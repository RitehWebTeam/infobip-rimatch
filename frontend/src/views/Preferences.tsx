import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "../components/Dropzone";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MovmentButtons from "../components/MovmentButtons";
import { useNavigate } from "react-router-dom";
const Preferences = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const navigate = useNavigate();
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
    userNumber: Yup.number()
      .required("Required")
      .min(111111111, "Please input a valid phone number"),
    userLocation: Yup.string()
      .required("Required")
      .min(3, "Location name must be longer then 2 character"),
    userDescription: Yup.number().required("Required"),
  });
  return (
    <div id="all">
      <Formik
        //!Forma i validacija ne znam kako cemo rijesiti dodavanje slike
        initialValues={{
          minAge: "",
          maxAge: "",
          preferredGender: "",
          userPhoneNumber: "",
          userDescription: "",
          location: "",
        }}
        validationSchema={preferenceSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 3)); //TODO Ovo je za test samo
            console.log(values);
            setSubmitting(false);
            navigate("/");
          }, 400);
        }}
      >
        {(formikPreference) => (
          <Form onSubmit={formikPreference.handleSubmit}>
            <div id="page1" className="page">
              {/*Page 1 Gender select and number input*/}
              <div className="page flex flex-col items-center w-full ">
                <div className="flex flex-col mt-4" data-aos="fade-right">
                  <div className="   mb-16">
                    <div
                      data-aos="fade-right"
                      className="relative  text-left flex flex-col"
                    >
                      <label
                        className="text-white text-3xl text-center font-Montserrat mb-4 "
                        htmlFor="gender"
                      >
                        Input you phone number
                      </label>

                      <Field
                        type="number"
                        name="userNumber"
                        id="userNumber"
                        className="bg-gray-50 border  font-Montserrat border-gray-300 text-gray-900 text-m rounded-lg focus:ring-red-500 focus:border-red-500 w-full  p-2.5"
                        placeholder="091 999 999"
                      />
                      <ErrorMessage
                        component="div"
                        name="userNumber"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-delay="250"
                    className="mt-16"
                  >
                    <div className="relative ">
                      <label
                        className="text-white text-3xl text-center font-Montserrat"
                        htmlFor="gender"
                      >
                        Choose your preferred gender
                      </label>

                      <Field
                        name="preferredGender"
                        id="preferredGender"
                        as="select"
                        className="bg-gray-50 mt-4 border font-Montserrat border-gray-300 text-gray-900 text-m rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                      >
                        <option value="" disabled selected hidden>
                          Choose a Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 mb-5">
                  <MovmentButtons page="#page2" moveName="Next" />
                </div>
              </div>
            </div>
            {/*Page 2 age select*/}
            <div>
              <div className="page" id="page2">
                <div className="absolute top-0 mt-5 ">
                  <MovmentButtons page="#page1" moveName="Previous" />
                </div>

                <div className="flex  flex-col justify-center">
                  <div
                    data-aos="fade-right"
                    data-aos-delay="100"
                    className="flex flex-col my-16"
                  >
                    <label
                      className="text-white text-3xl font-Montserrat text-center"
                      htmlFor="minAge"
                    >
                      Minimum partner Age
                    </label>
                    <Field
                      type="number"
                      id="minAge"
                      placeholder="18 - 99"
                      name="minAge"
                      className="rounded-2xl px-5 py-2 bg-gray-200 text-black"
                    />
                    <ErrorMessage
                      component="div"
                      name="minAge"
                      className="text-red-500"
                    />
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-delay="200"
                    className="flex flex-col "
                  >
                    <label
                      className="text-white text-3xl font-Montserrat text-center"
                      htmlFor="maxAge"
                    >
                      Maximum partner age
                    </label>
                    <Field
                      type="number"
                      id="maxAge"
                      placeholder="18 - 99"
                      name="maxAge"
                      className="rounded-2xl px-5 py-2 bg-gray-200 text-black"
                    />
                    <ErrorMessage
                      component="div"
                      name="maxAge"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 mb-5">
                  <MovmentButtons page="#page3" moveName="Next" />
                </div>
              </div>
              {/*Page 3 Location and description*/}
              <div className="page  flex flex-col justify-center" id="page3">
                <div className="absolute top-0 mt-5">
                  <MovmentButtons page="#page2" moveName="Previous" />
                </div>
                <div data-aos="fade-right" data-aos-once="false">
                  <div data-aos="fade-right" className="flex flex-col mb-24">
                    <label
                      className="text-white text-3xl font-Montserrat text-center"
                      htmlFor="maxAge"
                    >
                      Where are you from
                    </label>
                    <Field
                      type="text"
                      id="userLocation"
                      placeholder="Please input your location"
                      name="userLocation"
                      className="rounded-2xl px-5 py-2 bg-gray-200 text-black"
                    />
                    <ErrorMessage
                      component="div"
                      name="userLocation"
                      className="text-red-500"
                    />
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-delay="200"
                    className="flex flex-col mb-24"
                  >
                    <label
                      className="text-white text-3xl font-Montserrat text-center"
                      htmlFor="maxAge"
                    >
                      Tell us about yourself
                    </label>
                    <Field
                      as="textarea"
                      rows="4"
                      cols="50"
                      id="userDescription"
                      placeholder="Description"
                      name="userDescription"
                      className="rounded-2xl px-5 py-2 bg-gray-200 text-black"
                    />
                    <ErrorMessage
                      component="div"
                      name="userDescription"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 mb-5">
                  <MovmentButtons page="#page4" moveName="Next" />
                </div>
              </div>
              {/*Page 4 Picture upload*/}
              <div className="page  flex flex-col justify-center" id="page4">
                <div className="absolute top-0 mt-5">
                  <MovmentButtons page="#page3" moveName="Previous" />
                </div>
                <h1
                  data-aos="fade-right"
                  className="flex text-white text-3xl mt-10 font-Montserrat mb-5 "
                >
                  Upload some pictures for your account
                </h1>
                <div
                  data-aos-delay="200"
                  data-aos="fade-right"
                  className="flex justify-center w-full"
                >
                  <Dropzone />
                </div>
                <button
                  className=" absolute bottom-0 text-gray-300  bg-[#00000042] rounded-full mb-4 px-5 py-3 text-center hover:opacity-75 transition-opacity duration-300"
                  type="submit"
                >
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

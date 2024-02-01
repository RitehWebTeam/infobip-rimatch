import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "../components/Dropzone";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MovmentButtons from "../components/MovmentButtons";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { UsersService } from "@/api/users";
import type { PreferencesInitData } from "@/types/User";
import ScrollToFieldError from "@/components/ScrollToFieldError";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const preferenceSchema = Yup.object({
  minAge: Yup.number()
    .required("Required")
    .max(99, "Age must be between 18 and 99")
    .min(18, "Age must be between 18 and 99"),
  maxAge: Yup.number()
    .when("minAge", ([minAge], schema) =>
      minAge
        ? schema.min(minAge, "Max age must be greater than min age")
        : schema
    )
    .required("Required")
    .max(99, "Age must be between 18 and 99")
    .min(18, "Age must be between 18 and 99"),
  userPhoneNumber: Yup.number()
    .required("Required")
    .min(111111111, "Please input a valid phone number"),
  location: Yup.string()
    .required("Required")
    .min(3, "Location name must be longer than 2 characters"),
  userDescription: Yup.string().required("Required"),
  preferredGender: Yup.string().required("Required"),
  profileImage: Yup.mixed().required("Required"),

  favSong: Yup.string().required("Required"),
});

const initialValues = {
  minAge: "",
  maxAge: "",
  preferredGender: "",
  userPhoneNumber: "",
  userDescription: "",
  location: "",
  profileImage: null,
  favSong: "",
  tags: [],
};

type PreferenceValues = typeof initialValues & { profileImage: File | null } & {
  tags: string[];
};

const INPUT_PAGE_LOCATION: Record<keyof PreferenceValues, number> = {
  userPhoneNumber: 1,
  preferredGender: 1,
  minAge: 2,
  maxAge: 2,
  userDescription: 3,
  location: 3,
  tags: 4,
  favSong: 4,
  profileImage: 5,
};

const mapPreferenceValues = async (
  values: PreferenceValues,
  tags: string[]
): Promise<PreferencesInitData> => ({
  description: values.userDescription,
  profileImageUrl: await toBase64(values.profileImage!),
  phoneNumber: values.userPhoneNumber,
  location: values.location,
  favouriteSong: values.favSong,
  tags: tags,
  preferences: {
    ageGroupMin: parseInt(values.minAge, 10),
    ageGroupMax: parseInt(values.maxAge, 10),
    partnerGender: values.preferredGender,
  },
});

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

const Preferences = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { mutateAsync: initPreferences } = UsersService.useInitPreferences();
  const [tags, setTags] = useState<string[]>([]);
  const inputRefs = useRef(
    {} as Record<keyof PreferenceValues, HTMLInputElement>
  );
  const pageRefs = useRef({} as Record<number, HTMLDivElement>);
  useEffect(() => {
    // Hacky solution should change
    // If the user is active we redirect him to / which is ok
    // If the user is not logged in we also redirect him to / which will either redirect him to /login or
    // or it will refresh his token and return him here
    if (auth?.active || !auth?.accessToken) {
      navigate("/");
    }
  }, [auth?.active, auth?.accessToken, navigate]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newTags = value.split(/[ ,]/);
    setTags(newTags);
  };
  const handleSubmit = async (values: PreferenceValues) => {
    // TODO: Error handling

    const mappedValues = await mapPreferenceValues(values, tags);
    console.log(mappedValues);
    await initPreferences(mappedValues);
    setAuth((prev) => ({
      ...prev!,
      active: true,
    }));
    navigate("/");
  };

  return (
    <div id="all">
      <Formik
        initialValues={initialValues}
        validationSchema={preferenceSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div
              id="page1"
              className="page sm:w-full"
              ref={(el: HTMLDivElement) => (pageRefs.current["1"] = el)}
            >
              {/*Page 1 Gender select and number input*/}
              <div className="page sm:w-full flex flex-col items-center w-full ">
                <div className="flex flex-col mt-4" data-aos="fade-right">
                  <div className="mb-16 flex justify-center">
                    <div
                      data-aos="fade-right"
                      className="relative  text-left flex flex-col"
                    >
                      <label
                        className="text-white text-2xl sm:text-3xl text-center font-Montserrat mb-4 "
                        htmlFor="userPhoneNumber"
                      >
                        Input you phone number
                      </label>

                      <Field
                        type="number"
                        name="userPhoneNumber"
                        id="userPhoneNumber"
                        className="bg-gray-50 border font-Montserrat border-gray-300 text-gray-900 text-m rounded-lg focus:ring-red-500 focus:border-red-500  p-2.5"
                        placeholder="091 999 999"
                        innerRef={(el: HTMLInputElement) =>
                          (inputRefs.current.userPhoneNumber = el!)
                        }
                      />
                      <ErrorMessage
                        component="div"
                        name="userPhoneNumber"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-delay="250"
                    className="mt-16"
                  >
                    <div className="flex flex-col ">
                      <label
                        className="text-white text-[21px]  sm:text-3xl text-center font-Montserrat"
                        htmlFor="preferredGender"
                      >
                        Choose your preferred gender
                      </label>

                      <Field
                        name="preferredGender"
                        id="preferredGender"
                        as="select"
                        className="bg-gray-50 mt-4 border font-Montserrat border-gray-300 text-gray-900 text-m rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                        innerRef={(el: HTMLInputElement) =>
                          (inputRefs.current.preferredGender = el!)
                        }
                      >
                        <option value="" disabled hidden>
                          Choose a Gender
                        </option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="maxAge"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 mb-16 sm:mb-5">
                  <MovmentButtons page="#page2" moveName="Next" />
                </div>
              </div>
            </div>
            {/*Page 2 age select*/}
            <div>
              <div
                className="page "
                id="page2"
                ref={(el: HTMLDivElement) => (pageRefs.current["2"] = el)}
              >
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
                      className="text-white text-[26px] sm:text-4xl font-Montserrat text-center my-4"
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
                      innerRef={(el: HTMLInputElement) =>
                        (inputRefs.current.minAge = el!)
                      }
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
                      className="text-white text-[26px] sm:text-4xl  font-Montserrat text-center my-4"
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
                      innerRef={(el: HTMLInputElement) =>
                        (inputRefs.current.maxAge = el!)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="maxAge"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0  mb-16 sm:mb-5">
                  <MovmentButtons page="#page3" moveName="Next" />
                </div>
              </div>
              {/*Page 3 Location and description*/}
              <div
                className="page  flex flex-col items-center "
                id="page3"
                ref={(el: HTMLDivElement) => (pageRefs.current["3"] = el)}
              >
                <div className="absolute top-0 mt-5">
                  <MovmentButtons page="#page2" moveName="Previous" />
                </div>
                <div data-aos="fade-right" data-aos-once="false">
                  <div
                    data-aos="fade-right"
                    className="flex flex-col  mb-24 items-center"
                  >
                    <label
                      className="text-white text-[26px] sm:text-3xl font-Montserrat text-center mb-4"
                      htmlFor="location"
                    >
                      Where are you from
                    </label>
                    <Field
                      type="text"
                      id="location"
                      placeholder="Please input your location"
                      name="location"
                      className="flex justify-center rounded-2xl px-5 w-72 sm:w-full py-2 bg-gray-200 text-black"
                      innerRef={(el: HTMLInputElement) =>
                        (inputRefs.current.location = el!)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="location"
                      className="text-red-500"
                    />
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-delay="200"
                    className="flex flex-col mb-24 px-10"
                  >
                    <label
                      className="text-white text-[26px] sm:text-3xl  font-Montserrat text-center mb-4"
                      htmlFor="userDescription"
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
                      className="w-full  rounded-2xl px-5 py-2 bg-gray-200 text-black"
                      innerRef={(el: HTMLInputElement) =>
                        (inputRefs.current.userDescription = el!)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="userDescription"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 mb-16 sm:mb-5">
                  <MovmentButtons page="#page4" moveName="Next" />
                </div>
              </div>
              {/*Page 4 add tags and maybe something else */}
              <div
                className="page  flex flex-col items-center justify-center "
                id="page4"
                ref={(el: HTMLDivElement) => (pageRefs.current["4"] = el)}
              >
                <div className="absolute top-0 mt-5">
                  <MovmentButtons page="#page3" moveName="Previous" />
                </div>
                <div data-aos="fade-right" data-aos-once="false">
                  <div
                    data-aos="fade-right"
                    className="flex flex-col  mb-24 items-center "
                  >
                    <label
                      className="text-white text-[26px] sm:text-3xl font-Montserrat text-center mb-4"
                      htmlFor="tags"
                    >
                      Add some # for your profile
                    </label>

                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      placeholder="Please input some #"
                      className="flex justify-center rounded-2xl px-5 w-72 sm:w-full py-2 bg-gray-200 text-black"
                      onChange={handleChange}
                      ref={(el: HTMLInputElement) =>
                        (inputRefs.current.location = el!)
                      }
                      value={tags.join(" ")}
                    />
                    <ErrorMessage
                      component="div"
                      name="location"
                      className="text-red-500"
                    />
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-delay="200"
                    className="flex flex-col  mb-24 items-center "
                  >
                    <label
                      className="text-white text-[26px] sm:text-3xl font-Montserrat text-center mb-4"
                      htmlFor="favSong"
                    >
                      What is your favorite song?
                    </label>
                    <Field
                      type="text"
                      id="favSong"
                      placeholder="Please input your favorite song"
                      name="favSong"
                      className="flex justify-center rounded-2xl px-5 w-72 sm:w-full py-2 bg-gray-200 text-black"
                      innerRef={(el: HTMLInputElement) =>
                        (inputRefs.current.location = el!)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      name="location"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 mb-16 sm:mb-5">
                  <MovmentButtons page="#page5" moveName="Next" />
                </div>
              </div>
              {/*Page 5 Picture upload*/}
              <div
                className="page flex flex-col justify-between items-center"
                id="page5"
                ref={(el: HTMLDivElement) => (pageRefs.current["5"] = el)}
              >
                <div className=" top-0 mt-5">
                  <MovmentButtons page="#page4" moveName="Previous" />
                </div>
                <div
                  data-aos-delay="200"
                  data-aos="fade-right"
                  className="flex flex-col items-center flex-grow-0"
                >
                  <h1
                    data-aos="fade-right"
                    className="flex text-white text-lg md:text-3xl font-Montserrat mb-1"
                  >
                    Choose your profile picture
                  </h1>
                  <p className="text-gray-400 text-sm mb-4">Max size: 2 MB</p>
                  <div className="flex justify-center min-h-[9rem]">
                    <Dropzone name="profileImage" />
                  </div>
                </div>
                <button
                  disabled={isSubmitting}
                  className="justify-self-end mb-16 sm:mb-5 bottom-0 text-gray-300  bg-[#00000042] rounded-full  px-5 py-3 text-center hover:opacity-75 transition-opacity duration-300"
                  type="submit"
                >
                  {!isSubmitting ? (
                    "Submit"
                  ) : (
                    <CircularProgress size="1rem" color="inherit" />
                  )}
                </button>
              </div>
              <ScrollToFieldError
                pageRefs={pageRefs}
                inputPageLocation={INPUT_PAGE_LOCATION}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Preferences;

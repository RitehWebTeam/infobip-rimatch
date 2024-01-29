import { useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const updatePreferenceSchema = Yup.object({
  phoneNumber: Yup.number().required("Required"),

  age: Yup.number()
    .when("minAge", ([minAge], schema) =>
      minAge
        ? schema.min(minAge, "Max age must be greater than min age")
        : schema
    )
    .required("Required")
    .max(99, "Age must be between 18 and 99")
    .min(18, "Age must be between 18 and 99"),
  description: Yup.string().required("Required"),
  favoriteSong: Yup.string().required("Required"),

  location: Yup.string().required("Required"),
});

const UserPreferencePage = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  //Ovo handalja promjenu splitanje tagova i spremanje u state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newTags = value.split(" ");
    console.log(newTags);
    setTags(newTags);
  };
  type formTypes = {
    phoneNumber: string;
    age: string;
    description: string;
    favoriteSong: string;
    tags: string[];
    location: string;
  };
  const initialValues: formTypes = {
    phoneNumber: "",
    age: "",
    description: "",
    favoriteSong: "",
    tags: [],
    location: "",
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  //TODO Ovo samo meni za test slobodno izbrisi ili mijenjaj
  const handleSubmit = (values: formTypes) => {
    values.tags = tags; //Ovo stavlja tagove u values pa bi ovo trebalo biti tu prije slanja na backend
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="mb-4 flex flex-row gap-8">
        <img
          src={user.profileImageUrl}
          alt="User"
          className="w-24 h-24 sm:w-48 sm:h-48 rounded-full mb-2"
        />
        <div>
          <p className="text-white font-Pacifico text-4xl sm:text-8xl">
            {user.firstName}
          </p>
          <p className="text-white font-Pacifico text-4xl sm:text-8xl">
            {user.lastName}
          </p>
        </div>
      </div>

      <div className=" max-w-7xl p-6rounded shadow-md bg-[#343030]">
        <Formik
          initialValues={initialValues}
          validationSchema={updatePreferenceSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <div className="flex flex-col px-5 py-5">
            <Form className="w-full flex">
              <div className="flex ">
                <div className="w-1/2 pr-4">
                  <label className="block mb-2 text-white">Phone Number:</label>
                  <Field
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder={user.phoneNumber}
                    disabled={!editMode}
                    className="w-full p-3 mb-4 border rounded"
                  />
                  <ErrorMessage
                    component="div"
                    name="phoneNumber"
                    className="text-red-500"
                  />
                  <label className="block mb-2 text-white">Age:</label>
                  <Field
                    type="number"
                    id="age"
                    name="age"
                    placeholder={user.age}
                    disabled={!editMode}
                    className="w-full p-3 mb-4 border rounded"
                  />
                  <ErrorMessage
                    component="div"
                    name="age"
                    className="text-red-500"
                  />
                  <label className="block mb-2 text-white">Location:</label>
                  <Field
                    type="string"
                    id="location"
                    name="location"
                    placeholder={user.location}
                    disabled={!editMode}
                    className="w-full p-3 mb-4 border rounded"
                  />
                  <ErrorMessage
                    component="div"
                    name="location"
                    className="text-red-500"
                  />
                </div>
                <div className="w-1/2 pl-4">
                  <label className="block mb-2 text-white">
                    Favorite song:
                  </label>
                  <Field
                    type="string"
                    id="favoriteSong"
                    name="favoriteSong"
                    placeholder="Despacito"
                    disabled={!editMode}
                    className="w-full p-3 mb-4 border rounded"
                  />
                  <ErrorMessage
                    component="div"
                    name="favoriteSong"
                    className="text-red-500"
                  />
                  <ErrorMessage
                    component="div"
                    name="tags"
                    className="text-red-500"
                  />
                  <label className="block mb-2 text-white">Tags:</label>
                  <Field
                    type="text"
                    id="tags"
                    name="tags"
                    placeholder={user.description}
                    disabled={!editMode}
                    className="w-full p-3 mb-4 border rounded"
                    onChange={handleChange}
                    value={tags.join(" ")}
                  />
                  <ErrorMessage
                    component="div"
                    name="tags"
                    className="text-red-500"
                  />
                  <label className="block mb-2 text-white">Description:</label>
                  <Field
                    as="textarea"
                    cols={20}
                    type="string"
                    id="description"
                    name="description"
                    placeholder={user.description}
                    disabled={!editMode}
                    className="w-full p-3 mb-4 border rounded"
                  />
                  <ErrorMessage
                    component="div"
                    name="description"
                    className="text-red-500"
                  />
                </div>
              </div>
              {editMode && (
                <div className="flex ">
                  {editMode && (
                    <button
                      value="Save"
                      type="submit"
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Save
                    </button>
                  )}
                </div>
              )}
            </Form>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleEditClick}
                className={`px-4 py-2 mr-2 ${
                  editMode
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded`}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default UserPreferencePage;

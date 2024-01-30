import { useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

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

type formTypes = {
  phoneNumber: string;
  age: number;
  description: string;
  favoriteSong: string;
  location: string;
};

const UserProfileForm = () => {
  const user = useCurrentUserContext();
  const [editMode, setEditMode] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  //Ovo handalja promjenu splitanje tagova i spremanje u state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newTags = value.split(/[ ,]/);
    console.log(newTags);
    setTags(newTags);
  };

  const initialValues: formTypes = {
    phoneNumber: user.phoneNumber ?? "",
    age: user.age ?? undefined,
    description: user.description ?? "",
    favoriteSong: user.favouriteSong ?? "",
    location: user.location ?? "",
  };

  const handleSubmit = (values: formTypes) => {
    console.log({ ...values, tags });
    setEditMode(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePreferenceSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className="w-full flex flex-col relative">
        <div className="flex w-full">
          <div className="w-1/2 pr-4">
            <label className="block mb-2">Phone Number:</label>
            <Field
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              disabled={!editMode}
              className="w-full p-3 border rounded"
            />
            <ErrorMessage
              component="div"
              name="phoneNumber"
              className="text-sm text-red-500"
            />
            <label className="block my-2">Age:</label>
            <Field
              type="number"
              id="age"
              name="age"
              disabled={!editMode}
              className="w-full p-3 border rounded"
            />
            <ErrorMessage
              component="div"
              name="age"
              className="text-sm text-red-500"
            />
          </div>
          <div className="w-1/2 pl-4">
            <label className="block mb-2">Favorite song:</label>
            <Field
              type="string"
              id="favoriteSong"
              name="favoriteSong"
              disabled={!editMode}
              className="w-full p-3 border rounded"
            />
            <ErrorMessage
              component="div"
              name="favoriteSong"
              className="text-sm text-red-500"
            />
            <ErrorMessage
              component="div"
              name="tags"
              className="text-sm text-red-500"
            />
            <label className="block my-2">Location:</label>
            <Field
              type="string"
              id="location"
              name="location"
              disabled={!editMode}
              className="w-full p-3 border rounded"
            />
            <ErrorMessage
              component="div"
              name="location"
              className="text-sm text-red-500"
            />
          </div>
        </div>

        <label className="block my-2">Tags:</label>
        <input
          type="text"
          id="tags"
          name="tags"
          disabled={!editMode}
          className="w-full p-3 border rounded"
          onChange={handleChange}
          value={tags.join(" ")}
        />
        <ErrorMessage
          component="div"
          name="tags"
          className="text-sm text-red-500"
        />
        <label className="block my-2">Description:</label>
        <Field
          as="textarea"
          cols={20}
          type="string"
          id="description"
          name="description"
          disabled={!editMode}
          className="w-full p-3 border rounded"
        />
        <ErrorMessage
          component="div"
          name="description"
          className="text-sm text-red-500"
        />
        {!editMode ? (
          <div
            className="absolute right-3 -top-12 cursor-pointer hover:text-red-400"
            onClick={() => setEditMode(true)}
          >
            <ModeEditIcon />
          </div>
        ) : (
          <button
            type="submit"
            className="absolute right-3 -top-12 text-sm px-4 py-2 bg-red-400 dark:bg-slate-400 rounded"
          >
            Save
          </button>
        )}
      </Form>
    </Formik>
  );
};

export default UserProfileForm;

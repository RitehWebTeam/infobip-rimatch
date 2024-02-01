import { useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { UsersService } from "@/api/users";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

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
  const [tags, setTags] = useState<string[]>(user.tags ?? []);
  const { mutateAsync: updateUser } = UsersService.useUpdateUser();

  //Ovo handalja promjenu splitanje tagova i spremanje u state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newTags = value.split(/[ ,]/);
    setTags(newTags);
  };

  const handleCancleClick = () => {
    setEditMode(false);
  };

  const initialValues: formTypes = {
    phoneNumber: user.phoneNumber ?? "",
    age: user.age ?? undefined,
    description: user.description ?? "",
    favoriteSong: user.favouriteSong ?? "",
    location: user.location ?? "",
  };

  const handleSubmit = async (values: formTypes) => {
    await updateUser({
      phoneNumber: values.phoneNumber,
      age: values.age,
      description: values.description,
      favouriteSong: values.favoriteSong,
      location: values.location,
      tags: tags,
    });
    setEditMode(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePreferenceSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full flex flex-col relative">
          <div className="flex w-full">
            <div className="w-1/2 pr-4">
              <label className="block mb-2">Phone Number:</label>
              <Field
                type="string"
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
          <div className="absolute right-0 -top-12 flex text-2xl gap-6">
            {isSubmitting && editMode ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : !editMode ? (
              <div
                className="cursor-pointer hover:text-orange-400 text-2xl"
                onClick={() => setEditMode(true)}
              >
                <ModeEditIcon color="inherit" fontSize="inherit" />
              </div>
            ) : (
              <>
                <button type="submit">
                  <CheckIcon
                    color="inherit"
                    fontSize="inherit"
                    className="hover:text-green-500"
                  />
                </button>
                <button
                  onClick={() => handleCancleClick()}
                  className="hover:text-red-700"
                >
                  <CloseIcon color="inherit" fontSize="inherit" />
                </button>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;

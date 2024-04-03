import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import AuthService from "../../../api/auth";
//import { CircularProgress } from '@mui/material';
import { useNavigation } from "@react-navigation/native";
//import { EmailAtIcon, LockIcon } from '../assets/SVG';
//import {  Male } from '@mui/icons-material';
import { AxiosError } from "axios";
import { router } from "expo-router";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Must be a valid email"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or more")
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  firstName: Yup.string()
    .min(2, "Name must be longer than 2 characters")
    .max(30, "Name must be 30 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Surname must be longer than 2 characters")
    .max(30, "Surname must be 30 characters or less")
    .required("Required"),
  gender: Yup.string().required("Required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Required")
    .min(18, "You must be 18 or older")
    .max(99, "You must be 99 or younger"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
  gender: "",
  age: "",
};
type RegisterValues = typeof initialValues;
const RegisterForm = () => {
  const [registerError, setRegisterError] = useState("");
  const navigation = useNavigation();
  const { mutate: register } = AuthService.useRegister();
  const handleSubmit = async (
    values: RegisterValues,
    helpers: FormikHelpers<RegisterValues>
  ) => {
    helpers.setSubmitting(true);
    setRegisterError("");
    const registerData = {
      ...values,
      age: parseInt(values.age, 10),
    };
    register(registerData, {
      onSuccess: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: "(Protected)" as never }],
        });
      },
      onError: (error) => {
        let errorMessage = "Something went wrong";
        if (error instanceof AxiosError) {
          // The `error.response.data` is an object with the key being the field name
          // example { email: "Email already exists" }
          errorMessage = Object.values(error.response?.data)?.join(" ");
        }
        setRegisterError(errorMessage);
      },
      onSettled: () => {
        helpers.setSubmitting(false);
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
        validate={() => setRegisterError("")}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
        }) => (
          <View style={{ alignContent: "center", justifyContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              {/*  <BoyIcon color="action" fontSize="medium" /> */}
              <TextInput
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholder="Name"
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
            <Text style={{ color: "red" }}>{errors.firstName}</Text>
            {/* Similar inputs for lastName, gender, age, email, password, and confirmPassword */}
            {registerError !== "" && (
              <Text style={{ color: "red" }}>{registerError}</Text>
            )}
            <Button
              title="Register"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            />
            <Button
              title="Go back"
              onPress={() => router.push("LoginForm" as never)}
            />
            {/* {isSubmitting ? <CircularProgress size="small" color="inherit" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Register</Text>}
            </Button> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterForm;

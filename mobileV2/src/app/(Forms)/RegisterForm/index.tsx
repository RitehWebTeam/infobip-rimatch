import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import AuthService from "../../../api/auth";
import { router } from "expo-router";
import { AxiosError } from "axios";
import { StyleSheet } from "react-native";
const RegisterSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Must be a valid email"),
  password: Yup.string()
    .max(30, "Must be 30 characters or less")
    .min(8, "Password must be 8 characters or more")
    .required("Required"),
  firstName: Yup.string()
    .required("Required")
    .max(30, "Name be 30 characters or less")
    .min(2, "Name be longer then 2 characters"),
  lastName: Yup.string()
    .required("Required")
    .max(30, "Surname be 30 characters or less")
    .min(2, "Surname be longer then 2 characters"),
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
  console.log("Loading register");
  const [registerError, setRegisterError] = useState("");
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
      onSuccess: () => router.push("/LoginForm"),
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
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
        gender: "",
        age: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
      validate={() => {
        setRegisterError("");
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isSubmitting,
        errors,
      }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.inputContainer}>
            {/* <PersonIcon /> */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
          </View>
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
          )}

          <View style={styles.inputContainer}>
            {/* <PersonIcon /> */}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
          </View>
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}

          <View style={styles.inputContainer}>
            {/*  <MaleIcon /> */}
            <TextInput
              style={styles.input}
              placeholder="Gender"
              onChangeText={handleChange("gender")}
              onBlur={handleBlur("gender")}
              value={values.gender}
            />
          </View>
          {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

          <View style={styles.inputContainer}>
            {/* <DateRangeIcon /> */}
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={handleChange("age")}
              onBlur={handleBlur("age")}
              value={values.age}
            />
          </View>
          {errors.age && <Text style={styles.error}>{errors.age}</Text>}

          <View style={styles.inputContainer}>
            {/* <EmailIcon /> */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </View>
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <View style={styles.inputContainer}>
            {/*  <LockIcon /> */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
          </View>
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <View style={styles.inputContainer}>
            {/* <LockIcon /> */}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
          </View>
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}

          {registerError !== "" && (
            <Text style={styles.error}>{registerError}</Text>
          )}

          <Button
            title={isSubmitting ? "Registering..." : "Register"}
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginTop: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  inputContainer: {
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterForm;

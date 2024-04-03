import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import AuthService from "../../api/auth";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
/* import {  LockIcon, EmailAtIcon } from '../../../assets/SVG'; */
import { StyleSheet } from "react-native";
import { router } from "expo-router";
/* import CircularProgress from '@mui/material/CircularProgress'; */

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Must be valid email"),
  password: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
});
const initialValues = {
  email: "",
  password: "",
};
type LoginValues = typeof initialValues;
const LoginForm = () => {
  const [loginError, setLoginError] = useState("");
  const navigation = useNavigation();
  const { mutate: login } = AuthService.useLogin();
  const handleSubmit = (
    values: LoginValues,
    helpers: FormikHelpers<LoginValues>
  ) => {
    helpers.setSubmitting(true);
    setLoginError("");
    login(values, {
      onSuccess: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: "(Protected)" as never }],
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          setLoginError(
            error.response?.data?.message ?? "Invalid email or password"
          );
        } else {
          setLoginError("Something went wrong");
        }
      },
      onSettled: () => {
        helpers.setSubmitting(false);
      },
    });
  };

  const styles = StyleSheet.create({
    title: {
      fontFamily: "Pacifico_400Regular",
    },
  });
  return (
    <View className="flex-1 justify-center items-center  bg-red-400">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                  marginBottom: 10,
                },
              ]}
            >
              RiMatch
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 16, marginBottom: 20 }}
            >
              Welcome Back
            </Text>
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
              {/* <EmailAtIcon />   */}
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email address"
                keyboardType="email-address"
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
            <Text style={{ color: "red" }}>{errors.email}</Text>
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
              {/* <LockIcon />  */}
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
            <Text style={{ color: "red" }}>{errors.password}</Text>
            <Text style={{ color: "red" }}>{loginError}</Text>
            <Button title="Login" onPress={() => handleSubmit()}></Button>
            {/*  <Button
              
             
            >
              {isSubmitting ? <CircularProgress size="small" color="inherit" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>}
            </Button> */}
            <TouchableOpacity
              /* onPress={() => navigation.navigate('ForgotPassword')} */
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/RegisterForm");
              }}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Don&apost have an account? Sign up here!
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

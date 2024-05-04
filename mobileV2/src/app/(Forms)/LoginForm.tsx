import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import AuthService from "../../api/auth";
import { AxiosError } from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { View } from "react-native";
import {
  TextInput,
  Text,
  HelperText,
  Button,
  useTheme,
} from "react-native-paper";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
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
  const theme = useTheme();
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
        console.log("Login successful");
        navigation.navigate("(Protected)" as never);
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError && error.response?.status === 401) {
          console.log(error);
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
      validate={() => setLoginError("")}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched,
      }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 40,
            flexDirection: "column",
            rowGap: 60,
          }}
        >
          <View>
            <Text
              variant="displayMedium"
              style={{ color: theme.colors.primary, fontWeight: "700" }}
            >
              RiMatch
            </Text>
            <Text variant="headlineMedium">Welcome back!</Text>
          </View>
          <View>
            <View>
              <TextInput
                label="Email"
                mode="outlined"
                error={!!errors.email && touched.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                left={
                  <TextInput.Icon
                    icon={({ color }) => (
                      <Ionicons name="at" size={18} color={color} />
                    )}
                  />
                }
              />
              <HelperText
                type="error"
                visible={!!errors.email && touched.email}
              >
                {touched.email && errors.email}
              </HelperText>
            </View>
            <View>
              <TextInput
                label="Password"
                mode="outlined"
                error={!!errors.password && touched.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
                left={
                  <TextInput.Icon
                    icon={({ color }) => (
                      <Ionicons name="lock-closed" size={18} color={color} />
                    )}
                  />
                }
              />
              <HelperText
                type="error"
                visible={!!errors.password && touched.password}
              >
                {touched.password && errors.password}
              </HelperText>
            </View>
            <HelperText type="error" visible={!!loginError}>
              {loginError}
            </HelperText>
            <View style={{ display: "flex", rowGap: 15 }}>
              <Button
                mode="contained"
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Login
              </Button>
              <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link
                  href={"/RegisterForm"}
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "700",
                    textDecorationLine: "underline",
                  }}
                >
                  Register here
                </Link>
              </Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

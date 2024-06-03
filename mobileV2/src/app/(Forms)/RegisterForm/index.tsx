import { useMemo, useState } from "react";
import { Formik, FormikHelpers, useField } from "formik";
import * as Yup from "yup";
import AuthService from "../../../api/auth";
import { router } from "expo-router";
import { AxiosError } from "axios";
import { ScrollView, View } from "react-native";
import {
  Appbar,
  Button,
  Divider,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "../../../context/ThemeProvider";
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: Yup.string()
    .max(30, "Must be 30 characters or less")
    .min(8, "Password must be 8 characters or more")
    .required("Password is required"),
  firstName: Yup.string()
    .required("First name is required")
    .max(30, "Name be 30 characters or less")
    .min(2, "Name be longer then 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(30, "Surname be 30 characters or less")
    .min(2, "Surname be longer then 2 characters"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "You must be 18 or older")
    .max(99, "You must be 99 or younger"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
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
  const { mutate: register } = AuthService.useRegister();
  const {theme} = useTheme();
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
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegisterSchema}
      validate={() => setRegisterError("")}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        handleSubmit,
        isSubmitting
      }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Appbar.Header>
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content title="Register" />
          </Appbar.Header>
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 20,
              backgroundColor: theme.colors.primary
            }}
          >
            <Text variant="bodyMedium">
              Create an account to start using RiMatch
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <View>
              <TextInput
                label="First name"
                mode="outlined"
                error={!!errors.firstName && touched.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                activeOutlineColor="#ee5253"
                left={
                  <TextInput.Icon
                    icon={({ color }) => (
                      <Ionicons name="person" size={18} color={color} />
                    )}
                  />
                }
              />
              <HelperText
                type="error"
                visible={!!errors.firstName && touched.firstName}
              >
                {touched.firstName && errors.firstName}
              </HelperText>
            </View>
            <View>
              <TextInput
                label="Last name"
                mode="outlined"
                error={!!errors.lastName && touched.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                activeOutlineColor="#ee5253"
                left={
                  <TextInput.Icon
                    icon={({ color }) => (
                      <Ionicons name="person" size={18} color={color} />
                    )}
                  />
                }
              />
              <HelperText
                type="error"
                visible={touched.lastName && !!errors.lastName}
              >
                {touched.lastName && errors.lastName}
              </HelperText>
            </View>
            <GenderPicker />
            <View>
              <TextInput
                label="Age"
                mode="outlined"
                error={!!errors.age && touched.age}
                onChangeText={handleChange("age")}
                onBlur={handleBlur("age")}
                value={values.age}
                activeOutlineColor="#ee5253"
                left={
                  <TextInput.Icon
                    icon={({ color }) => (
                      <Ionicons name="calendar" size={18} color={color} />
                    )}
                  />
                }
              />
              <HelperText type="error" visible={!!errors.age && touched.age}>
                {touched.age && errors.age}
              </HelperText>
            </View>
            <View>
              <TextInput
                label="Email"
                mode="outlined"
                error={!!errors.email && touched.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                activeOutlineColor="#ee5253"
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
                activeOutlineColor="#ee5253"
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
            <View>
              <TextInput
                label="Confirm Password"
                mode="outlined"
                activeOutlineColor="#ee5253"
                error={!!errors.confirmPassword && touched.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
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
                visible={!!errors.confirmPassword && touched.confirmPassword}
              >
                {touched.confirmPassword && errors.confirmPassword}
              </HelperText>
            </View>
            <HelperText
                type="error"
                visible={!!registerError}
              >
                {registerError}
              </HelperText>
            <Button onPress={() => handleSubmit()} mode="contained" loading={isSubmitting} disabled={isSubmitting} style={{backgroundColor:"#ee5253"}}>
              <Text style ={{color:"white"}}>Submit</Text>
            </Button>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

const GenderPicker = () => {
  const genderOptions = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
  ];
  const {theme} = useTheme();
  const [field, meta, helpers] = useField<string>("gender");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(field.value);
  const [items, setItems] = useState(genderOptions);

  const hasError = useMemo(
    () => !!meta.error && meta.touched,
    [meta.error, meta.touched]
  );

  const updateFormikValue = (value: string | null) => {
    helpers.setTouched(true);
    if (!value) {
      helpers.setError("Gender is required");
      return;
    }
    helpers.setError(undefined);
    helpers.setValue(value);
  };

  return (
    <View style={{ position: "relative", marginTop: 4 }}>
      <Text
        variant="labelMedium"
        style={{
          position: "absolute",
          left: 10,
          top: -8,
          paddingHorizontal: 3,
          backgroundColor: theme.colors.primary,
          zIndex: 11,
          color: hasError ? "red": theme.colors.onSurface,

        }}
      >
        Choose your gender
      </Text>
      <DropDownPicker
        listMode="SCROLLVIEW"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={updateFormikValue}
        zIndex={10}
        style={{    
          borderColor: 'gray',
          borderWidth: hasError ? 2 : 1,
          backgroundColor: theme.colors.primary,
          
        }}
      />
      <HelperText type="error" visible={!!meta.error && meta.touched}>
        {meta.error}
      </HelperText>
    </View>
  );
};

export default RegisterForm;

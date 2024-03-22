import { useMutation } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { axiosPublic } from "./src/api/config/axios";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  active: boolean;
  refreshToken: string;
}

const user = {
  email: "sophia.miller@gmail.com",
  password: "Password",
};

export default function App() {
  const mutation = useMutation({
    mutationFn: async ({ email, password }: LoginData) => {
      const response = await axiosPublic.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: ({ active, refreshToken, token }) =>
      Alert.alert(
        "Login success",
        `Token: ${token}, Active: ${active}, Refresh Token: ${refreshToken}`
      ),
  });
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Login" onPress={() => mutation.mutate(user)}></Button>
      <StatusBar style="auto" />
    </View>
  );
}
const $white = "#fff";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: $white,
    flex: 1,
    justifyContent: "center",
  },
});

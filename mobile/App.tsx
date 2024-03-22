import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, Text, View } from "react-native";
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

const client = new QueryClient();

function AppInternal() {
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
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Login" onPress={() => mutation.mutate(user)}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <AppInternal />
    </QueryClientProvider>
  );
}

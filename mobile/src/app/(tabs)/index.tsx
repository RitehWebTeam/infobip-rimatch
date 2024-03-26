import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { axiosPublic } from "../../api/config/axios";

import { AuthProvider } from "../../context/AuthProvider";

//import ProtectedRoutes from "../../routes/ProtectedRoutes";
import useAuth from "../../hooks/useAuth";

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
  const { setAuth } = useAuth();
  const mutation = useMutation({
    mutationFn: async ({ email, password }: LoginData) => {
      const response = await axiosPublic.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return response.data;
    },
    onError: (error) => {
      console.log("Error", error);
    },
    onSuccess: ({ active, token }) => {
      setAuth({ user: { email: user.email }, accessToken: token, active });
      console.log("Success", user.email);
      /*  Alert.alert(
          "Login success",
          `Token: ${token}, Active: ${active}, Refresh Token: ${refreshToken}`
        ), */
    },
  });
  const handlePress = () => {
    console.log("Pressed");
    mutation.mutate(user);
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Login" onPress={handlePress}></Button>

      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <AppInternal />
        <AuthLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export const AuthLayout = () => {
  const { auth } = useAuth();

  return auth ? (
    <View>
      <Text>LogedIn</Text>
    </View>
  ) : (
    <View>
      <Text>Log In</Text>
    </View>
  );

  {
    /* <Stack.Screen name="MatchesPage" component={MatchesPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
        <Stack.Screen name="SetupPreferencesPage" component={SetupPreferencesPage} />
        <Stack.Screen name="ListOfMatchesForChatPage" component={ListOfMatchesForChatPage} />
        <Stack.Screen name="ProfileDetailed" component={ProfileDetailed} />
        <Stack.Screen name="SettingsList" component={SettingsList} />
        <Stack.Screen name="SettingsPreferences" component={SettingsPreferences} />
        <Stack.Screen name="SettingsProfile" component={SettingsProfile} />
        <Stack.Screen name="SettingsProfilePicture" component={SettingsProfilePicture} />
        <Stack.Screen name="SettingsTheme" component={SettingsTheme} /> */
  }
};

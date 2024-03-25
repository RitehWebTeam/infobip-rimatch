import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { axiosPublic } from "./src/api/config/axios";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./src/context/AuthProvider";

import ProtectedRoutes from "./src/routes/ProtectedRoutes";
import useAuth from "./src/hooks/useAuth";

import Login from "./src/components/Login";

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
/* function DetailsScreen() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
} */
const Stack = createNativeStackNavigator();

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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth ? (
          <Stack.Screen name="ProtectedRoutes" component={ProtectedRoutes} />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}

        {/* <Stack.Screen name="MatchesPage" component={MatchesPage} />
      <Stack.Screen name="ChatPage" component={ChatPage} />
      <Stack.Screen name="SetupPreferencesPage" component={SetupPreferencesPage} />
      <Stack.Screen name="ListOfMatchesForChatPage" component={ListOfMatchesForChatPage} />
      <Stack.Screen name="ProfileDetailed" component={ProfileDetailed} />
      <Stack.Screen name="SettingsList" component={SettingsList} />
      <Stack.Screen name="SettingsPreferences" component={SettingsPreferences} />
      <Stack.Screen name="SettingsProfile" component={SettingsProfile} />
      <Stack.Screen name="SettingsProfilePicture" component={SettingsProfilePicture} />
      <Stack.Screen name="SettingsTheme" component={SettingsTheme} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

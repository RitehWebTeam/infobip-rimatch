import { useMutation } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { axiosPublic } from "../../api/config/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "expo-router";

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

function Login() {
  const { auth, setAuth } = useAuth();
  const navigation = useNavigation();
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
      console.log("Success", user.email);
      setAuth({ user: { email: user.email }, accessToken: token, active });
      console.log(auth?.accessToken);
      console.log(auth?.active);
      navigation.reset({
        index: 0,
        routes: [{ name: "(Protected)" as never }],
      });
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

export default Login;

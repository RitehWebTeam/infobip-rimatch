import useAuth from "../../../hooks/useAuth";
import { Text, View } from "react-native";

export default function App() {
  return <AuthLayout />;
}

export const AuthLayout = () => {
  const { auth } = useAuth();
  console.log(auth);
  return auth ? (
    <View>
      <Text>Loged in</Text>
    </View>
  ) : (
    <View>
      <Text>Log In</Text>
    </View>
  );
};

import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import { Button, Text, View } from "react-native";

export default function App() {
  return <AuthLayout />;
}

export const AuthLayout = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  console.log(auth);
  return auth ? (
    <View>
      <Text>Loged in</Text>
      <Button title="Log Out" onPress={() => logout()} />
    </View>
  ) : (
    <View>
      <Text>Log In</Text>
    </View>
  );
};

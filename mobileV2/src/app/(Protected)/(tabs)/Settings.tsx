import { View, Text, Button } from "react-native";
import useLogout from "../../../hooks/useLogout";

const Settings = () => {
  const logout = useLogout();

  return (
    <View>
      <Text>Settings</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

export default Settings;

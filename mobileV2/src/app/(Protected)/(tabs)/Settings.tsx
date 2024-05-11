import { View, Text } from "react-native";
import useLogout from "../../../hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "react-native-paper";

const Settings = () => {
  const logout = useLogout();
  const queryClient = useQueryClient();

  return (
    <View style={{ flex: 1, gap: 15, paddingHorizontal: 20 }}>
      <Text>Settings</Text>
      <Button
        mode="contained"
        onPress={() => {
          queryClient.clear();
        }}
      >
        Clear cache
      </Button>
      <Button mode="contained" onPress={() => logout()}>
        Logout
      </Button>
    </View>
  );
};

export default Settings;

import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
const ChatLayout = () => {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        title: "Messages",
        headerBackVisible: false,
        headerTintColor: theme.colors.secondary,
        headerStyle: { backgroundColor: theme.colors.primary },
      }}
    />
  );
};

export default ChatLayout;

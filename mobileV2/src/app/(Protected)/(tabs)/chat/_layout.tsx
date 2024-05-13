import { Stack } from "expo-router";

const ChatLayout = () => {
  return (
    <Stack
      screenOptions={{
        title: "Messages",
        headerBackVisible: false,
      }}
    />
  );
};

export default ChatLayout;

import ChatListUser from "@/components/chat/ChatListUser";
import { View, StyleSheet } from "react-native";

const ChatPage = () => {
  return (
    <View style={styles.listContainer}>
      <ChatListUser />
      <ChatListUser />
      <ChatListUser />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
    gap: 20,
  },
});

export default ChatPage;

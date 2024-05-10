import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";

const ChatListUser = () => {
  const message = "How are you?";

  const truncatedMessage = useMemo(() => {
    if (message.length > 25) {
      return message.slice(0, 25) + "...";
    }
    return message;
  }, [message]);
  const imageLink =
    "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg";

  return (
    <View style={itemStyles.container}>
      <Avatar.Image size={64} source={{ uri: imageLink }} />
      <View style={itemStyles.infoContainer}>
        <View>
          <Text variant="titleMedium" style={itemStyles.nameText}>
            Emelie
          </Text>
          <Text variant="bodyMedium">{truncatedMessage}</Text>
        </View>
        <Text variant="bodyMedium" style={itemStyles.timeText}>
          12:00
        </Text>
      </View>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    columnGap: 5,
    borderBottomColor: "#f1f1f1",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    maxWidth: "72%",
  },
  nameText: {
    fontWeight: "bold",
  },
  timeText: {
    color: "#999",
    fontWeight: "400",
    marginTop: 5,
  },
});

export default ChatListUser;

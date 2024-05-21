import { MessagesService } from "@/api/messages";
import { MatchedUser } from "@/types/User";
import { Link } from "expo-router";
import { useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Avatar, Text } from "react-native-paper";

interface ChatListUserProps {
  matchedUser: MatchedUser;
}

const formatMessage = (message: string) => {
  return message.slice(0, 25) + (message.length > 25 ? "..." : "");
};

const ChatListUser = ({ matchedUser }: ChatListUserProps) => {
  const { data } = MessagesService.useGetMessages(matchedUser.chatId);
  const { timestamp, message } = useMemo(() => {
    const lastMessage = data?.content.at(0);
    if (!lastMessage) {
      return {
        timestamp: "",
        message: "",
      };
    }
    const sentByCurrentUser = lastMessage.receiverId === matchedUser.id;
    const prefix = sentByCurrentUser ? "You: " : "";
    const date = new Date(lastMessage.timestamp);
    return {
      timestamp: date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: `${prefix}${formatMessage(lastMessage.content)}`,
    };
  }, [data?.content]);

  return (
    <Link
      href={{
        pathname: "chat/[id]",
        params: { id: matchedUser.id },
      }}
      asChild
    >
      <Pressable style={itemStyles.container}>
        <Avatar.Image size={64} source={{ uri: matchedUser.profileImageUrl }} />
        <View style={itemStyles.infoContainer}>
          <View>
            <Text variant="titleMedium" style={itemStyles.nameText}>
              {matchedUser.firstName}
            </Text>
            <Text variant="bodyMedium">{message}</Text>
          </View>
          <Text variant="bodyMedium" style={itemStyles.timeText}>
            {timestamp}
          </Text>
        </View>
      </Pressable>
    </Link>
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

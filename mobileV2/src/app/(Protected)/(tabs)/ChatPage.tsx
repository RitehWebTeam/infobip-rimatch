import { MatchesService } from "@/api/matches";
import { MessagesService } from "@/api/messages";
import ChatListUser from "@/components/chat/ChatListUser";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme, Text, ActivityIndicator } from "react-native-paper";

const ChatListing = () => {
  const theme = useTheme();
  const query = MatchesService.useGetMatches();
  const currentUser = useCurrentUserContext();
  MessagesService.useSubscribeToMessages(currentUser.id);

  if (query.isLoading) {
    return (
      <ChatListingHeader>
        <View style={styles.centeredContainer}>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      </ChatListingHeader>
    );
  }

  if (query.isError || !query.isSuccess) {
    <ChatListingHeader>
      <View style={styles.centeredContainer}>
        <Text variant="headlineSmall" style={{ color: theme.colors.error }}>
          Something went wrong.
        </Text>
      </View>
    </ChatListingHeader>;
  }

  return (
    <ChatListingHeader>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={query.data}
        renderItem={({ item }) => <ChatListUser matchedUser={item} />}
        keyExtractor={(item) => item.id}
      />
    </ChatListingHeader>
  );
};

const ChatListingHeader = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.mainContainer}>{children}</View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  listContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default ChatListing;

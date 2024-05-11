import { Text, View, StyleSheet, RefreshControl } from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { MatchesService } from "@/api/matches";
import { MessagesService } from "@/api/messages";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useCallback, useMemo, useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";

const UserChatPage = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const userQuery = MatchesService.useGetMatchedUserById(userId);
  const recentMessages = MessagesService.useGetMessages(userQuery.data?.chatId);
  const sendMessage = MessagesService.useSendMessage();
  const currentUser = useCurrentUserContext();
  const [refreshing, setRefreshing] = useState(false);
  if (userQuery.isLoading) return <Text>Loading...</Text>;

  if (userQuery.isError || !userQuery.isSuccess) {
    return <Redirect href="chat" />;
  }

  if (recentMessages.isLoading) return <Text>Loading...</Text>;

  if (recentMessages.isError || !recentMessages.isSuccess) {
    return <Text>Error...</Text>;
  }

  const onSend = useCallback((messages: Array<IMessage>) => {
    sendMessage(messages[0].text, userId!, userQuery.data.chatId);
  }, []);

  const messages = useMemo(() => {
    return recentMessages.data.content.map((message): IMessage => {
      const sentByCurrentUser = message.senderId === currentUser.id;
      return {
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.timestamp),
        user: {
          _id: message.senderId,
          avatar: sentByCurrentUser
            ? currentUser.profileImageUrl
            : userQuery.data.profileImageUrl,
          name: sentByCurrentUser
            ? currentUser.firstName
            : userQuery.data.firstName,
        },
      };
    });
  }, [recentMessages.data.content]);

  const _onLoadEarlier = useCallback(() => {
    console.log("onLoadEarlier");
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    //Any action which needs to be performed when pull to refresh happens
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: userQuery.data.firstName,
          headerBackVisible: true,
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        scrollToBottom={true}
        user={{
          _id: currentUser.id,
        }}
        timeFormat="HH:mm"
        listViewProps={{
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onLoadEarlier}
            />
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserChatPage;

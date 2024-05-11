import { Text, View, StyleSheet, Pressable } from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { MatchesService } from "@/api/matches";
import { MessagesService } from "@/api/messages";
import {
  GiftedChat,
  IMessage,
  LoadEarlierProps,
} from "react-native-gifted-chat";
import { memo, useCallback, useMemo, useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { ActivityIndicator } from "react-native-paper";

const UserChatPage = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const userQuery = MatchesService.useGetMatchedUserById(userId);
  const recentMessages = MessagesService.useGetMessages(userQuery.data?.chatId);
  const sendMessage = MessagesService.useSendMessage();
  const currentUser = useCurrentUserContext();
  const [historyEnable, setHistoryEnable] = useState(false);

  const history = MessagesService.useGetMessagesHistory(
    userQuery.data?.chatId!,
    recentMessages.data?.content?.at(-1)?.id!,
    historyEnable
  );

  const onEndReached = () => {
    if (history.isPending) {
      setHistoryEnable(true);
    } else {
      history.fetchNextPage();
    }
  };

  const messages = useMemo(() => {
    const allMesages = recentMessages.data?.content.map((message): IMessage => {
      const sentByCurrentUser = message.senderId === currentUser.id;
      return {
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.timestamp),
        user: {
          _id: message.senderId,
          avatar: sentByCurrentUser
            ? currentUser.profileImageUrl
            : userQuery.data?.profileImageUrl,
          name: sentByCurrentUser
            ? currentUser.firstName
            : userQuery.data?.firstName,
        },
      };
    });

    history.data?.pages.forEach((page) => {
      page.content?.forEach((message) => {
        const sentByCurrentUser = message.senderId === currentUser.id;
        allMesages?.push({
          _id: message.id,
          text: message.content,
          createdAt: new Date(message.timestamp),
          user: {
            _id: message.senderId,
            avatar: sentByCurrentUser
              ? currentUser.profileImageUrl
              : userQuery.data?.profileImageUrl,
            name: sentByCurrentUser
              ? currentUser.firstName
              : userQuery.data?.firstName,
          },
        });
      });
    });
    return allMesages;
  }, [recentMessages.data?.content, history.data?.pages]);

  const onSend = useCallback((messages: Array<IMessage>) => {
    sendMessage(messages[0].text, userId!, userQuery.data?.chatId!);
  }, []);

  if (userQuery.isLoading || recentMessages.isLoading)
    return <CenteredLoader />;

  if (userQuery.isError || !userQuery.isSuccess) {
    return <Redirect href="chat" />;
  }
  if (recentMessages.isError || !recentMessages.isSuccess) {
    return <Text>Error...</Text>;
  }

  console.log(messages?.length, historyEnable);

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
        renderLoading={() => <CenteredLoader />}
        loadEarlier={historyEnable && history.hasNextPage}
        isLoadingEarlier={historyEnable && history.isFetchingNextPage}
        renderLoadEarlier={(props) => <LoadEarlier {...props} />}
        listViewProps={{
          onEndReached: onEndReached,
          onEndReachedThreshold: 0.6,
          initialNumToRender: 10,
        }}
      />
    </View>
  );
};

const CenteredLoader = memo(() => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator animating size="large" />
  </View>
));

const stylesLoad = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export function LoadEarlier({
  isLoadingEarlier = false,
}: LoadEarlierProps): React.ReactElement {
  return (
    <Pressable style={stylesLoad.container} disabled={isLoadingEarlier}>
      <View style={stylesLoad.wrapper}>
        {isLoadingEarlier && <ActivityIndicator animating />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserChatPage;

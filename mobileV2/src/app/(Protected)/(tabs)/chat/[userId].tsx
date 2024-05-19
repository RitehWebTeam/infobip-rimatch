import { Text, View, StyleSheet, Pressable } from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { MatchesService } from "@/api/matches";
import { MessagesService } from "@/api/messages";
import {
  Bubble,
  GiftedChat,
  IMessage,
  LoadEarlierProps,
} from "react-native-gifted-chat";
import { memo, useCallback, useMemo, useState } from "react";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { Message } from "@/types/Message";
import { ProjectedUser, User } from "@/types/User";

const mapMessage = (
  message: Message,
  currentUser: User,
  matchedUser?: ProjectedUser
): IMessage => {
  const sentByCurrentUser = message.senderId === currentUser.id;
  return {
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.timestamp),
    user: {
      _id: message.senderId,
      avatar: sentByCurrentUser
        ? currentUser.profileImageUrl
        : matchedUser?.profileImageUrl,
      name: sentByCurrentUser ? currentUser.firstName : matchedUser?.firstName,
    },
  };
};

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

  // Fix for not showing the loading spinner when there are no messages
  const onEndReached = useCallback(() => {
    if (history.isPending) {
      setHistoryEnable(true);
    } else {
      history.fetchNextPage();
    }
  }, [history.isPending]);

  const messages = useMemo(() => {
    const allMesages = recentMessages.data?.content.map(
      (message): IMessage => mapMessage(message, currentUser, userQuery.data)
    );
    history.data?.pages.forEach((page) => {
      page.content?.forEach((message) => {
        const mappedMessage = mapMessage(message, currentUser, userQuery.data);
        allMesages?.push(mappedMessage);
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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: userQuery.data.firstName,
          headerBackVisible: true,
        }}
      />
      <GiftedChat
        messagesContainerStyle={{ backgroundColor: "white" }}
        messages={messages}
        onSend={onSend}
        scrollToBottom={true}
        user={{
          _id: currentUser.id,
        }}
        timeFormat="HH:mm"
        renderBubble={(props) => <CustomBubble {...props} />}
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

function LoadEarlier({
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

const CustomBubble = memo((props) => {
  const theme = useTheme();
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: theme.colors.primary },
      }}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserChatPage;

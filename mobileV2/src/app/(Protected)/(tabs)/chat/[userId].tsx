import { Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { MatchesService } from "@/api/matches";

const UserChatPage = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const userQuery = MatchesService.useGetMatchedUserById(userId);

  if (userQuery.isLoading) return <Text>Loading...</Text>;

  if (userQuery.isError || !userQuery.isSuccess) {
    return <Text>Something went wrong.</Text>;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: userQuery.data.firstName,
        }}
      />
    </View>
  );
};

export default UserChatPage;

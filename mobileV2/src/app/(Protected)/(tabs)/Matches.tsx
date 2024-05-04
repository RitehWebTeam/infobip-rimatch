import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import MatchedUserCard from "../../../components/MatchedUserCard";
import { ProjectedUser } from "../../../types/User";
import { UsersService } from "../../../api/users";
import { Link } from "expo-router";

const items = [1, 2, 3, 4, 5];
const users = items.map<ProjectedUser>((item) => ({
  id: item.toString(),
  firstName: "John",
  age: 21,
  profileImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/twitterclone-b784a.appspot.com/o/DSC_0050.JPG?alt=media&token=c6e6f3ad-2027-4595-a2f0-be799341d906",
  description: "I am a software engineer",
  location: "Lagos, Nigeria",
  favouriteSong: "Love Story",
  gender: "M",
  lastName: "Doe",
  tags: ["#software", "#engineer"],
}));
const Matches = () => {
  const query = UsersService.useGetMatches();
  const theme = useTheme();

  if (query.isLoading) {
    return (
      <MatchHeader>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      </MatchHeader>
    );
  }

  if (query.isError || !query.isSuccess) {
    return (
      <MatchHeader>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="headlineSmall" style={{ color: theme.colors.error }}>
            Something went wrong.
          </Text>
        </View>
      </MatchHeader>
    );
  }

  const matches = query.data;

  if (matches.length === 0) {
    return (
      <MatchHeader>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{ color: theme.colors.onBackground }}
          >
            No matches yet?
          </Text>
          <Link href="/" asChild>
            <Pressable>
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.primary }}
              >
                Check out some users.
              </Text>
            </Pressable>
          </Link>
        </View>
      </MatchHeader>
    );
  }

  return (
    <MatchHeader>
      <FlatList
        data={users}
        renderItem={(user) => <MatchedUserCard user={user.item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.itemContainer}
      />
    </MatchHeader>
  );
};

interface MatchHeaderProps {
  children?: React.ReactNode;
}

const MatchHeader = ({ children }: MatchHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.subtitle}>
        This is a list of people who matched with you.
      </Text>
      <View style={styles.divider} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    paddingHorizontal: 25,
    backgroundColor: "white",
    gap: 10,
  },
  subtitle: {
    marginTop: 4,
    color: "black",
    opacity: 0.8,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgb(229 231 235)",
    marginTop: 7,
    marginBottom: 3,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  itemContainer: {
    gap: 13,
  },
});

export default Matches;

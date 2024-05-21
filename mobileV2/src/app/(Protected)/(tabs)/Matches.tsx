import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { Link } from "expo-router";
import { MatchesService } from "@/api/matches";
import MatchedUserCard from "@/components/MatchedUserCard";
import { useTheme } from "@/context/ThemeProvider";

const Matches = () => {
  const query = MatchesService.useGetMatches();

  const { theme } = useTheme();

  if (query.isLoading) {
    return (
      <MatchHeader>
        <View style={styles.centeredContainer}>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      </MatchHeader>
    );
  }

  if (query.isError || !query.isSuccess) {
    return (
      <MatchHeader>
        <View style={styles.centeredContainer}>
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
        <View style={styles.centeredContainer}>
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
        data={matches}
        renderItem={({ item }) => <MatchedUserCard user={item} />}
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default Matches;

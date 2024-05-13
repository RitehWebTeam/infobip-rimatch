import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MatchesService } from "../../../api/matches";
import MatchedUser from "../../../components/MatchedUser";
import { Link } from "expo-router";

const MatchesPage = () => {
  const query = MatchesService.useGetMatches();

  if (query.isLoading) {
    return (
      <MatchHeader>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading</Text>
        </View>
      </MatchHeader>
    );
  }

  if (query.isError || !query.isSuccess) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  const matches = query.data;
  console.log(matches);
  if (matches.length === 0) {

    return (
      <MatchHeader>
        <View style={styles.container}>
          <Text style={[styles.loadingText, { backgroundColor: "cyan" }]}>
            No matches yet?
          </Text>
          <Link href="/" style={styles.linkText}>
            <Text>Check out some users.</Text>
          </Link>
        </View>
      </MatchHeader>
    );
  }

  return (
    <MatchHeader>
      <View style={styles.gridContainer}>
        {matches.map((user) => (
          <Link key={user.id} href="./profile">
            <MatchedUser user={user} />
          </Link>
        ))}
      </View>
    </MatchHeader>
  );
};

interface MatchHeaderProps {
  children: React.ReactNode;
}

const MatchHeader = ({ children }: MatchHeaderProps) => {
  return (
    <View style={styles.matchHeaderContainer}>
      <View style={styles.matchHeader}>
        <Text style={styles.matchHeaderText}>Matches</Text>
        <Text style={styles.matchHeaderDescription}>
          This is a list of people who matched with you.
        </Text>
        <View style={styles.divider} />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 4,
  },
  loadingText: {
    fontSize: 16,
    backgroundColor: "cyan",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "red",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 7,
    width: "100%",
    marginTop: 3,
    maxHeight: 330,
    overflow: "hidden",
  },
  matchHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 8,
  },
  matchHeader: {
    backgroundColor: "white",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  matchHeaderText: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    lineHeight: 51,
  },
  matchHeaderDescription: {
    color: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    marginTop: 4,
  },
  divider: {
    backgroundColor: "gray",
    width: "100%",
    height: 1,
  },
});

export default MatchesPage;

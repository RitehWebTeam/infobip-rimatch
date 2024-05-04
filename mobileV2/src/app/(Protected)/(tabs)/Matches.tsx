import { View, StyleSheet, FlatList, Image } from "react-native";
import { Text } from "react-native-paper";

const Matches = () => {
  return <MatchHeader />;
};

interface MatchHeaderProps {
  children?: React.ReactNode;
}

const MatchHeader = ({ children }: MatchHeaderProps) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.subtitle}>
        This is a list of people who matched with you.
      </Text>
      <View style={styles.divider} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/twitterclone-b784a.appspot.com/o/DSC_0050.JPG?alt=media&token=c6e6f3ad-2027-4595-a2f0-be799341d906",
              }}
              style={styles.userImage}
            />
            <View style={styles.textBackground}>
              <Text variant="titleMedium" style={styles.userLabel}>
                Test, 21
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.itemContainer}
      />
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
  item: {
    flex: 1,
    width: 140,
    height: 200,
    maxWidth: "47%",
    borderRadius: 10,
  },
  userImage: {
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  userLabel: {
    color: "white",
  },
  textBackground: {
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default Matches;

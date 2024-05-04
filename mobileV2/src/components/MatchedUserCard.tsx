import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { ProjectedUser } from "../types/User";

interface MatchedUsersProps {
  user: ProjectedUser;
}

const MatchedUserCard = ({ user }: MatchedUsersProps) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: user.profileImageUrl,
        }}
        style={styles.userImage}
      />
      <View style={styles.textBackground}>
        <Text variant="titleMedium" style={styles.userLabel}>
          {user.firstName}, {user.age}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: 140,
    height: 230,
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
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 7,
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default MatchedUserCard;

import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler"; // Assuming you have TouchableOpacity from react-native-gesture-handler
import { ProjectedUser } from "../types/User";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeProvider";
interface ProfileCardProps {
  user: ProjectedUser;
  onClose: () => void;
  showChatIcon?: boolean;
  handleNextUser: (matchAccept: boolean, userId: string) => void;
}
interface MatchedTag {
  value: string;
  matched: boolean;
}

const ProfileCard = ({
  user,
  onClose,
  showChatIcon = false,
  handleNextUser,
}: ProfileCardProps) => {
  /* const loggedInUser = useCurrentUserContext(); */
  const { theme } = useTheme();
  const isSpotifySong = useMemo(() => {
    if (!user.favouriteSong) return false;
    return user.favouriteSong?.search(/open.spotify.com/gi) !== -1;
  }, [user.favouriteSong]);

  /* const matchedTags = useMemo<MatchedTag[]>(() => {
    const matchTags = user.tags.map((tag) => ({
      value: tag,
      matched: loggedInUser.tags.includes(tag),
    }));
    return matchTags.sort((a) => (a.matched ? -1 : 1));
  }, [user.tags, loggedInUser.tags]); */

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <ScrollView style={{ backgroundColor: theme.colors.primary }}>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: theme.colors.primary,
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}
        >
          <Image
            source={{ uri: user.profileImageUrl || "/Default_pfp.svg" }}
            style={{
              width: "100%",
              aspectRatio: 1,
              resizeMode: "cover",
              borderRadius: 10,
            }}
            /* loadingIndicatorSource="/Default_pfp.svg" */
          />
        </View>
        <View
          style={[
            styles.buttonCOntainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => handleNextUser(false, user.id)}
          >
            <Entypo name="cross" size={40} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.middleButton}
            onPress={() => handleNextUser(true, user.id)}
          >
            <AntDesign name="heart" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={() => {}}>
            <AntDesign name="star" size={40} color="purple" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingTop: 130,
            paddingBottom: 10,
            zIndex: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#F13559",
                zIndex: 20,
                marginBottom: 20,
              }}
            >
              {user.firstName} {user.lastName}, {user.age}
            </Text>

            <TouchableOpacity onPress={() => Linking.openURL("/messages/chat")}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#E8E6EA",
                  backgroundColor: "#fff",
                }}
              >
                <EvilIcons name="sc-telegram" size={40} color="red" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 5,
                fontSize: 16,
                color: theme.colors.secondary,
              }}
            >
              Location
            </Text>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 16,
                color: theme.colors.secondary,
              }}
            >
              {user.location}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 5,
                fontSize: 16,
                fontFamily: "Times new roman",
                color: theme.colors.secondary,
              }}
            >
              About
            </Text>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 16,
                color: theme.colors.secondary,
              }}
            >
              {user.description}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontSize: 16,
                color: theme.colors.secondary,
              }}
            >
              Tags
            </Text>
            {/*  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {matchedTags.map(
                  (tag: any, index: React.Key | null | undefined) => (
                    <Tag key={index} tag={tag} />
                  )
                )}
              </View> */}
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                fontSize: 16,
                color: theme.colors.secondary,
              }}
            >
              Favorite song
            </Text>
            {isSpotifySong ? (
              /*  <Spotify wide link={user.favouriteSong} /> */
              <Text>Song</Text>
            ) : (
              <Text style={{ color: theme.colors.secondary }}>
                {user.favouriteSong}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    width: "90%",
    height: "10%",
    marginHorizontal: 20,
    zIndex: 10,
  },
  middleButton: {
    width: 120,
    height: 120,
    borderRadius: 70,
    backgroundColor: "#F13559", // Replace [#F13559] with "#F13559"
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F13559",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  sideButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "white", // Replace [#F13559] with "#F13559"
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F13559",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
const Tag = ({ tag }: { tag: any }) => {
  const tagStyle = {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: 80,
    borderWidth: 1,
    borderColor: tag.matched ? "#FF0000" : "#ccc",
    backgroundColor: tag.matched ? "#FF0000" : "#fff",
    flexDirection: "row",
    alignItems: "center",
  };

  return (
    <View>
      {tag.matched}
      <Text>{tag.value}</Text>
    </View>
  );
};

export default ProfileCard;

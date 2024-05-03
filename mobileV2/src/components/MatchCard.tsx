import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { ProjectedUser } from "../types/User";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface MatchCardProps {
  user: ProjectedUser;
  loading: boolean;
  handleNextUser: (matchAccept: boolean, userId: string) => void;
  openDetailedProfile: () => void;
}
const MatchCard = ({
  user,
  loading,
  handleNextUser,
  openDetailedProfile,
}: MatchCardProps) => {
  return (
    <View>
      <TouchableHighlight onPress={openDetailedProfile}>
      <View style={styles.cardContainer} >
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/twitterclone-b784a.appspot.com/o/DSC_0050.JPG?alt=media&token=c6e6f3ad-2027-4595-a2f0-be799341d906",
          }}
          style={styles.userImage}
          
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user.firstName}, {user.age}</Text>
          <Text style={styles.userCity}>{user.location}</Text>
        </View>
      </View>
      </TouchableHighlight>
      <View style={styles.buttonCOntainer}>
        <TouchableOpacity style={styles.sideButton} onPress={() => handleNextUser(false, user.id)}>
          <Entypo name="cross" size={40} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.middleButton} onPress={() => handleNextUser(true, user.id)}>
          <AntDesign name="heart" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideButton} onPress={() => {}}> 
          <AntDesign name="star" size={40} color="purple" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: 450,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 40,
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
  userImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // Adjust opacity as needed
    padding: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  userAge: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  userCity: {
    fontSize: 18,
    color: "white",
  },
});

export default MatchCard;

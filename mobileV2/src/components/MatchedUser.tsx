import { View,Image,Text,StyleSheet } from "react-native";
import { ProjectedUser } from "../types/User";

interface MatchedUsersProps {
  user: ProjectedUser;
}

const MatchedUser = ({ user }: MatchedUsersProps) => {
  return (
    <View style={styles.constainer}>
      <View style={styles.pictureContainer}>
      <Image
          source={{
            uri: user.profileImageUrl,
          }}
          style={styles.picture}
          
        />
      </View>
     
      <View style={styles.textContainer}>
        <Text>{user.firstName}, {user.age}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 4,
  },
  pictureContainer:{
    position: "absolute",
    width: "100%",
    height: "100%",
    borderStartColor: "black",
    borderEndColor: "black",
  },
  picture:{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  textContainer:{
    position: "absolute",
    left: 4,
    bottom: 2,
    color: "white",
    fontWeight: "bold",
    fontSize: 12, // Change the value to a number
    lineHeight: 6,
    
  },
  
  
})
export default MatchedUser;

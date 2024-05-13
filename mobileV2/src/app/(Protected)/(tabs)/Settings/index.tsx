import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import useLogout from "../../../../hooks/useLogout";
import useCurrentUserContext from "../../../../hooks/useCurrentUser";
import { Button, Divider, Switch } from "react-native-paper";
import { useColorScheme } from "nativewind";
import { FontAwesome5 } from '@expo/vector-icons';
const Settings = ({ navigation }: { navigation: any }) => {
  const logout = useLogout();
  const user = useCurrentUserContext();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View>
      <View style={style.imageContainer}>
        <Image
          source={{ uri: user?.profileImageUrl }}
          style={style.imageStyle}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {user.firstName} {user.lastName}
        </Text>
       
      </View>
      <View style={style.buttonContainer}>
        <Divider />
        <Button
          icon={"contacts"}
          onPress={() => navigation.navigate("UserSettings")}
          style={{
            backgroundColor: "#fff",
            width: "100%",
            padding: 10,
            alignItems: "flex-start",
            borderRadius: 0,
          }}
        >
          <Text style={style.buttonText}>User Settings</Text>
        </Button>
        <Divider />
        <Button
          onPress={() => navigation.navigate("ProfilePicture")}
          style={style.button}
          icon={"camera"}
        >
          <Text style={style.buttonText}>Profile Picture</Text>
        </Button>
        <Divider />

        <Button
          onPress={() => navigation.navigate("Preferences")}
          style={style.button}
          icon={"cards-heart-outline"}
        >
          <Text style={style.buttonText}>Preferences</Text>
        </Button>

        <Divider />

        
          <View className=" flex-row items-center justify-between " style={style.button}>
          <View className=" flex-row ml-2">
          <FontAwesome5 className="ml-3"  name="palette" size={20} color="pink" />
           <Text className="ml-2"  style={style.buttonText}>Theme</Text>
          </View>
            <Switch
              value={colorScheme == "dark"}
              onValueChange={toggleColorScheme}
              color="#ee5253"
            />
          </View>
        

        <Divider />
        <Button
          icon={"image-multiple-outline"}
          onPress={() => navigation.navigate("Gallery")}
          style={style.button}
        >
          <Text style={style.buttonText}>Gallery</Text>
        </Button>
        <Divider />
      </View>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={style.logOutButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "baseline",
    backgroundColor: "gray",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderTopColor: "#00f",
  },
  button: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    alignItems: "flex-start",
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageStyle: {
    width: 175,
    height: 175,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#fff",
    shadowColor: "#F13559",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  logOutButton: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    backgroundColor: "#ee5253",
    padding: 10,
    borderRadius: 20,
    marginTop: 70,
    marginHorizontal: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 10, height: 40 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
export default Settings;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import useLogout from "../../../../hooks/useLogout";
import useCurrentUserContext from "../../../../hooks/useCurrentUser";
import { Button, Divider, Switch } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Settings = ({ navigation }: { navigation: any }) => {
  const logout = useLogout();
  const user = useCurrentUserContext();
  const { isDarkTheme, toggleThemeType, theme } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.colors.primary }}>
      <View style={style.imageContainer}>
        <Image
          source={{ uri: user?.profileImageUrl }}
          style={style.imageStyle}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.secondary,
          }}
        >
          {user.firstName} {user.lastName}
        </Text>
      </View>
      <View style={style.buttonContainer}>
        <Divider />
        <Button
          onPress={() => navigation.navigate("UserSettings")}
          style={[style.button, { backgroundColor: theme.colors.tertiary }]}
        >
          <View>
            <MaterialIcons
              name="contacts"
              size={20}
              color="red"
              style={{ marginRight: 10 }}
            />
          </View>
          <Text
            style={[style.buttonText, { color: theme.colors.secondary }]}
            className="ml-2"
          >
            User Settings
          </Text>
        </Button>
        <Divider />
        <Button
          onPress={() => navigation.navigate("ProfilePicture")}
          style={[style.button, { backgroundColor: theme.colors.tertiary }]}
        >
          <View>
            <MaterialIcons
              name="camera-alt"
              size={20}
              color="red"
              style={{ marginRight: 10 }}
            />
          </View>
          <Text
            style={[style.buttonText, { color: theme.colors.secondary }]}
            className="ml-2"
          >
            Profile Picture
          </Text>
        </Button>
        <Divider />
        <Button
          onPress={() => navigation.navigate("Preferences")}
          style={[style.button, { backgroundColor: theme.colors.tertiary }]}
        >
          <View>
            <FontAwesome6
              name="heart"
              size={20}
              color="red"
              style={{ marginRight: 10 }}
            />
          </View>
          <Text
            style={[style.buttonText, { color: theme.colors.secondary }]}
            className="ml-2"
          >
            Preferences
          </Text>
        </Button>
        <Divider />
        <View
          className="flex-row items-center justify-between"
          style={[style.button, { backgroundColor: theme.colors.tertiary }]}
        >
          <View className="flex-row ml-3">
            <FontAwesome5 name="palette" size={20} color="red" />
            <Text
              className="ml-2  "
              style={[style.buttonText, { color: theme.colors.secondary }]}
            >
              Dark mode
            </Text>
          </View>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleThemeType}
            color="#ee5253"
          />
        </View>
        <Divider />
        <Button
          onPress={() => navigation.navigate("Gallery")}
          style={[style.button, { backgroundColor: theme.colors.tertiary }]}
        >
          <View>
            <MaterialCommunityIcons
              name="image-multiple-outline"
              size={20}
              color="red"
              style={{ marginRight: 10 }}
            />
          </View>
          <Text
            style={[style.buttonText, { color: theme.colors.secondary }]}
            className="ml-2"
          >
            Gallery
          </Text>
        </Button>
        <Divider />
      </View>

      <TouchableOpacity
        className="bg-[#ee5253] p-3 rounded-full mt-14 mb-10 mx-4"
        onPress={() => logout()}
      >
        <Text className=" text-center text-white text-xl">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
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
    width: "100%",
    padding: 10,
    alignItems: "flex-start",
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
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
    borderColor: "#ee5253",
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


import { createStackNavigator } from "@react-navigation/stack";
import Gallery from "./(screens)/Gallery";
import Preferences from "./(screens)/Preferences";
import index from "./index";
import { View } from "react-native";
import Theme from "./(screens)/Theme";
import UserSettings from "./(screens)/UserSettings";
import ProfilePicture from "./(screens)/ProfilePicture";
//!Layout for SetupPreferences and all of its steps
const _layout = () => {
  const Stack = createStackNavigator();
  console.log("Loading setup preferences");
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={index}
          options={{ headerShown: false,
            
           }}
        />
        <Stack.Screen
          name="Gallery"
        
          component={Gallery}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
        />
         <Stack.Screen
          name="Theme"
          component={Theme}
        />
         <Stack.Screen
          name="UserSettings"
          component={UserSettings}
        />
         <Stack.Screen
          name="ProfilePicture"
          component={ProfilePicture}
        />
      </Stack.Navigator>
    </View>
  );
};

export default _layout;


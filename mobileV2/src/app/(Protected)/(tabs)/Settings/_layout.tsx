import { createStackNavigator } from "@react-navigation/stack";
import Gallery from "./(screens)/Gallery";
import Preferences from "./(screens)/Preferences";
import index from "./index";
import { View } from "react-native";
import Theme from "./(screens)/Theme";
import UserSettings from "./(screens)/UserSettings";
import ProfilePicture from "./(screens)/ProfilePicture";
import { useTheme } from "react-native-paper";

const _layout = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={index}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{
            headerTintColor: theme.colors.secondary,
            headerStyle: { backgroundColor: theme.colors.primary },
          }}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{
            headerTintColor: theme.colors.secondary,
            headerStyle: { backgroundColor: theme.colors.primary },
          }}
        />
        <Stack.Screen
          name="Theme"
          component={Theme}
          options={{
            headerTintColor: theme.colors.secondary,
            headerStyle: { backgroundColor: theme.colors.primary },
          }}
        />
        <Stack.Screen
          name="UserSettings"
          component={UserSettings}
          options={{
            headerTintColor: theme.colors.secondary,
            headerStyle: { backgroundColor: theme.colors.primary },
          }}
        />
        <Stack.Screen
          name="ProfilePicture"
          component={ProfilePicture}
          options={{
            headerTintColor: theme.colors.secondary,
            headerStyle: { backgroundColor: theme.colors.primary },
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default _layout;

import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// !Layout for the tabs/Main screen
const _layout = () => {
  console.log("Loading tabs");
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Matches"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ChatPage"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

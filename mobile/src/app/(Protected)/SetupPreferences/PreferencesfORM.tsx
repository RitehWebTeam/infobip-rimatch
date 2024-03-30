import { View, Text, Button } from "react-native";
import { useNavigation } from "expo-router";

const Preferences = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Preferences</Text>
      <Button
        title="Save Preferences"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "SetupPreferences" as never }],
          });
        }}
      />
    </View>
  );
};

export default Preferences;

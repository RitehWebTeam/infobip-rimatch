import { Button, View, Text } from "react-native";

type HomeScreenProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any; // Replace 'any' with the appropriate type for the 'navigation' prop
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

export default HomeScreen;

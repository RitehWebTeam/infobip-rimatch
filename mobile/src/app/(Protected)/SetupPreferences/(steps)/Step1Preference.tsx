import { View, TextInput, Text } from "react-native";

const Step1Preferences = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 12 }}>
        <Text>Input your phone number</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          placeholder="091 999 999"
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Where are you from?</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          placeholder="Please input your location"
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Tell us about yourself:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          placeholder="I like bees..."
        />
      </View>
    </View>
  );
};

export default Step1Preferences;

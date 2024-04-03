import React from "react";
import { View, Text, TextInput } from "react-native";

const Step3Preferences = () => {
  const [favoriteSong, setFavoriteSong] = React.useState("");
  const [tags, setTags] = React.useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 12 }}>
        <Text>What is your favorite song?</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          placeholder="Input your favorite song"
          value={favoriteSong}
          onChangeText={(text) => setFavoriteSong(text)}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Enter some tags:</Text>
        <Text style={{ fontSize: 12, color: "gray", marginBottom: 8 }}>
          (separate with spaces)
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          placeholder="Enter tags"
          value={tags}
          onChangeText={(text) => setTags(text)}
        />
      </View>
    </View>
  );
};

export default Step3Preferences;

/* import React from "react";
import { View, Text, TextInput, Picker } from "react-native";

const Step2Preferences = () => {
  const [partnerGender, setPartnerGender] = React.useState("");
  const [ageGroupMin, setAgeGroupMin] = React.useState("");
  const [ageGroupMax, setAgeGroupMax] = React.useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 12 }}>
        <Text>Preferred gender</Text>
        <Picker
          selectedValue={partnerGender}
          onValueChange={(itemValue: React.SetStateAction<string>) =>
            setPartnerGender(itemValue)
          }
        >
          <Picker.Item label="Choose a Gender" value="" />
          <Picker.Item label="Male" value="M" />
          <Picker.Item label="Female" value="F" />
        </Picker>
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Minimum partner age</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          keyboardType="numeric"
          placeholder="18 - 99"
          value={ageGroupMin}
          onChangeText={(text) => setAgeGroupMin(text)}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Maximum partner age</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          keyboardType="numeric"
          placeholder="18 - 99"
          value={ageGroupMax}
          onChangeText={(text) => setAgeGroupMax(text)}
        />
      </View>
    </View>
  );
};

export default Step2Preferences;
 */

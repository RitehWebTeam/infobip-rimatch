import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { WizardStore } from "../store";
import {
  Button,
  MD3Colors,
  ProgressBar,
  Divider,
  Portal,
  Dialog,
} from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
type PreferencesProps = {
  navigation: NavigationProp<object>;
};
export default function Confirmation({ navigation }: PreferencesProps) {
  // keep back arrow from showing
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const information = WizardStore.useState();

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const clearAndReset = () => {
    WizardStore.replace({
      description: "",
      phoneNumber: "",
      location: "",
      favouriteSong: "",
      profileImageUrl: "",
      tags: "", //* Promijeni nazad u []
      ageGroupMin: "",
      ageGroupMax: "",
      partnerGender: "",
      progress: 0,
    });
    setVisible(false);
    //navigation.replace("Step1");
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <View style={{ paddingHorizontal: 16 }}>
        {/* <!-- dialog --> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              <Text>Alert</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>
                <Text>Cancel</Text>
              </Button>
              <Button onPress={clearAndReset}>
                <Text>Done</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <SummaryEntry name={information.phoneNumber} label={"Full Name"} />

        <SummaryEntry name={information.description} label={"Age"} />

        <SummaryEntry name={information.location} label={"Birth Place"} />

        <SummaryEntry
          name={information.favouriteSong}
          label={"Mother's Maiden Name"}
        />

        <SummaryEntry
          name={information.profileImageUrl}
          label={"Accepted User Terms"}
        />

        <SummaryEntry
          name={information.ageGroupMin}
          label={"Accepted User Privacy Policy"}
        />

        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => navigation.navigate("Step4" as never)}
        >
          <Text>GO BACK</Text>
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => setVisible(true)}
        >
          <Text>SaveData</Text>
        </Button>
      </View>
    </View>
  );
}

export const SummaryEntry = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8, fontWeight: "700" }}>{label}</Text>
      <Text style={{ marginBottom: 8 }}>{name}</Text>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },

  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
  },
});

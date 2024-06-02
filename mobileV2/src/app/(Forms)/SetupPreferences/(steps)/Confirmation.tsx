import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { storeTypes, WizardStore } from "../store";
import {
  Button,
  ProgressBar,
  Divider,
  Portal,
  Dialog,
} from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { PreferencesInitData } from "../../../../types/User";
//import { toBase64 } from "../../../../utils";
import useAuth from "../../../../hooks/useAuth";
import { UsersService } from "../../../../api/users";
import { router } from "expo-router";

import { useTheme } from "@/context/ThemeProvider";
const initialValues = {
  description: "",
  phoneNumber: "",
  location: "",
  favouriteSong: "",
  profileImageUrl: null,
  tags: [] as Array<string>,
  preferences: {
    ageGroupMin: "",
    ageGroupMax: "",
    partnerGender: "",
  },
};

type PreferencesProps = {
  navigation: NavigationProp<object>;
};

//WORKING on sending data to the server
const mapPreferenceValues = (values: storeTypes): PreferencesInitData => ({
  data: {
    description: values.description,
    phoneNumber: values.phoneNumber,
    location: values.location,
    favouriteSong: values.favouriteSong,
    // @ts-ignore
    tags:
      typeof values.tags === "string" ? values.tags.split(" ") : values.tags,
    preferences: {
      ageGroupMin: parseInt(values.preferences.ageGroupMin, 10),
      ageGroupMax: parseInt(values.preferences.ageGroupMax, 10),
      partnerGender: values.preferences.partnerGender,
    },
  },
  photo: values.profileImageUrl!,
});

export default function Confirmation({ navigation }: PreferencesProps) {
  const { setAuth } = useAuth();
  const { mutateAsync: initPreferences } = UsersService.useInitPreferences();
  const { theme } = useTheme();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const handleSubmit = async (values: storeTypes) => {
    // TODO: Error handling

    const mappedValues = mapPreferenceValues(values);

    console.log(mappedValues);
    await initPreferences(mappedValues);

    setAuth((prev) => ({
      ...prev!,
      active: true,
    }));
    router.replace("/");
  };

  const information = WizardStore.useState();

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const clearAndReset = () => {
    WizardStore.replace({
      description: "",
      phoneNumber: "",
      location: "",
      favouriteSong: "",
      profileImageUrl: null,
      tags: [] as Array<string>,
      preferences: {
        ageGroupMin: "",
        ageGroupMax: "",
        partnerGender: "",
      },
      progress: 0,
    });
    setVisible(false);
    navigation.navigate("Step 1" as never);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
    >
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={theme.colors.accent}
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

        <SummaryEntry name={information.phoneNumber} label={"Phone Number"} />

        <SummaryEntry name={information.description} label={"Description"} />

        <SummaryEntry name={information.location} label={"You are from "} />

        <SummaryEntry
          name={information.favouriteSong}
          label={"Your favourite song is"}
        />

        {/*  <SummaryEntry
          name={information.profileImageUrl}
          label={"Accepted User Terms"}
        /> */}

        <SummaryEntry
          name={information.preferences.ageGroupMin}
          label={"Your minimal partner age is"}
        />
        <SummaryEntry
          name={information.preferences.ageGroupMin}
          label={"Your maximum partner age is"}
        />
        <SummaryEntry
          name={information.preferences.partnerGender}
          label={"Your prefered partner is"}
        />
        <SummaryEntry
          name={information.tags as unknown as string}
          label={"Your tags are"}
        />
        <Button
          style={{
            margin: 8,
            backgroundColor: theme.colors.accent,
            borderWidth: 2,
          }}
          mode="outlined"
          onPress={() => navigation.navigate("Step 4" as never)}
        >
          <Text style={{ color: "white", borderColor: theme.colors.accent }}>
            GO BACK
          </Text>
        </Button>
        <Button
          style={{
            margin: 8,
            backgroundColor: theme.colors.accent,
            borderWidth: 2,
          }}
          mode="outlined"
          onPress={() => handleSubmit(information)}
        >
          <Text style={{ color: "white", borderColor: theme.colors.accent }}>
            SaveData
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}

export const SummaryEntry = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          marginBottom: 8,
          fontWeight: "700",
          color: theme.colors.secondary,
        }}
      >
        {label}
      </Text>
      <Text style={{ marginBottom: 8, color: theme.colors.secondary }}>
        {name}
      </Text>
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

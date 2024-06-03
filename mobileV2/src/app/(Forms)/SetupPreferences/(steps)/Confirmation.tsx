import React, { useMemo, useState } from "react";
import { HelperText, Text } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { storeTypes, WizardStore } from "../store";
import { Button, ProgressBar, Divider } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { PreferencesInitData } from "../../../../types/User";
import useAuth from "../../../../hooks/useAuth";
import { UsersService } from "../../../../api/users";
import { router } from "expo-router";

import { useTheme } from "@/context/ThemeProvider";

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
    tags: values.tags,
    preferences: {
      ageGroupMin: values.preferences.ageGroupMin,
      ageGroupMax: values.preferences.ageGroupMax,
      partnerGender: values.preferences.partnerGender,
    },
  },
  photo: values.profileImageUrl!,
});

export default function Confirmation({ navigation }: PreferencesProps) {
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const { mutateAsync: initPreferences } = UsersService.useInitPreferences();
  const { theme } = useTheme();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const handleSubmit = async (values: storeTypes) => {
    setError(null);
    const mappedValues = mapPreferenceValues(values);
    try {
      await initPreferences(mappedValues);
    } catch (error) {
      setError("Something went wrong");
      return;
    }

    setAuth((prev) => ({
      ...prev!,
      active: true,
    }));
    router.replace("/");
  };

  const information = WizardStore.useState();

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
          name={information.preferences.ageGroupMax}
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
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={{
              backgroundColor: theme.colors.accent,
            }}
            onPress={() => handleSubmit(information)}
          >
            SUBMIT
          </Button>
          <Button
            mode="contained"
            style={{
              backgroundColor: theme.colors.secondary,
            }}
            onPress={() => navigation.navigate("Step 4" as never)}
          >
            GO BACK
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export const SummaryEntry = ({
  name,
  label,
}: {
  name: string | number | Array<string>;
  label: string;
}) => {
  const { theme } = useTheme();
  const displayValue = useMemo(() => {
    if (Array.isArray(name)) {
      return name.join(", ");
    }
    return name;
  }, []);
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
        {displayValue}
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
    marginBottom: 16,
  },
  progressBar: {
    marginBottom: 16,
  },
  buttonContainer: {
    display: "flex",
    gap: 8,
  },
});

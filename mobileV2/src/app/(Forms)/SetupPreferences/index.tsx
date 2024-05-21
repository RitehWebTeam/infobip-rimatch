import { useEffect } from "react";

import useAuth from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

import { View } from "react-native";

import { Text } from "react-native";
const SetupPreferencesPage = () => {
  const { auth } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    // Hacky solution should change
    // If the user is active we redirect him to / which is ok
    // If the user is not logged in we also redirect him to / which will either redirect him to /login or
    // or it will refresh his token and return him here
    if (auth?.active || !auth?.accessToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: "(Protected)" as never }],
      });
    }
  }, [auth?.active, auth?.accessToken, navigation]);

  /* const handleSubmit = async (values: SetupPreferencesValues) => {
    // TODO: Error handling

    const mappedValues = await mapPreferenceValues(values);
    await initPreferences(mappedValues);
    setAuth((prev) => ({
      ...prev!,
      active: true,
    }));
    navigation.reset({
      index: 0,
      routes: [{ name: "(Protected)" as never }],
    });
  }; */

  return (
    <PreferencesHeader>
      <Text>Jes</Text>
    </PreferencesHeader>
  );
};
interface PreferencesHeaderProps {
  children: React.ReactNode;
}
const PreferencesHeader = ({ children }: PreferencesHeaderProps) => {
  return (
    <View
      className="flex flex-col justify-center items-center flex-grow"
      id="red-to-black"
    >
      <View className="flex w-full flex-grow justify-center md:pb-8 sm:max-h-[50rem]">
        <View className="bg-white dark:bg-[#343030] flex w-[30rem] flex-col h-full items-center px-10 py-8 sm:rounded-lg shadow-lg shadow-black min-h-fit">
          {children}
        </View>
      </View>
    </View>
  );
};
export default SetupPreferencesPage;

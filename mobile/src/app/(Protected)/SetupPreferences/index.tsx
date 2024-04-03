import { useEffect } from "react";
import Step1Preferences from "./(steps)/Step1Preference";
//import Step2Preferences from "./(steps)/Step2Preference";
import Step3Preferences from "./(steps)/Step3Preference";
/* import Step4Preferences from "./(steps)/Step4Preference"; */
import useAuth from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator as createStack } from "@react-navigation/stack";

const Stack = createStack();
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
    <Stack.Navigator initialRouteName="SetupPreferences">
      <Stack.Screen name="Step1" component={Step1Preferences} />
      {/* <Stack.Screen name="Step2" component={Step2Preferences} /> */}
      <Stack.Screen name="Step3" component={Step3Preferences} />
      {/* <Stack.Screen name="Step4" component={Step4Preferences} /> */}
    </Stack.Navigator>
  );
};

export default SetupPreferencesPage;

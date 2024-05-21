import { useEffect } from "react";
import Confirmation from "./(steps)/Confirmation";
import Step1Preferences from "./(steps)/Step1Preference";
import Step2Preferences from "./(steps)/Step2Preference";
import Step3Preferences from "./(steps)/Step3Preference";
import Step4Preferences from "./(steps)/Step4Preference";
import { createStackNavigator } from "@react-navigation/stack";

import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";

//!Layout for SetupPreferences and all of its steps
const _layout = () => {
  const { auth } = useAuth();
  const Stack = createStackNavigator();
  console.log("Loading setup preferences");
  console.log(auth?.accessToken);
  useEffect(() => {
    // Hacky solution should change
    // If the user is active we redirect him to / which is ok
    // If the user is not logged in we also redirect him to / which will either redirect him to /login or
    // or it will refresh his token and return him here
    if (auth?.active || !auth?.accessToken) {
      <Redirect href="(ProtectedRoutes)" />;
    }
  }, [auth?.active, auth?.accessToken]);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Step1" component={Step1Preferences} />
      <Stack.Screen name="Step2" component={Step2Preferences} />
      <Stack.Screen name="Step3" component={Step3Preferences} />
      <Stack.Screen name="Step4" component={Step4Preferences} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
    </Stack.Navigator>
  );
};

export default _layout;

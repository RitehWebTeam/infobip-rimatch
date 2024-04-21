import Confirmation from "./(steps)/Confirmation";
import Step1Preferences from "./(steps)/Step1Preference";
import Step2Preferences from "./(steps)/Step2Preference";
import Step3Preferences from "./(steps)/Step3Preference";
import Step4Preferences from "./(steps)/Step4Preference";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

//!Layout for SetupPreferences and all of its steps
const _layout = () => {
  const Stack = createStackNavigator();
  console.log("Loading setup preferences");
  return (
    <PaperProvider>
      <Stack.Navigator>
        <Stack.Screen name="Step1" component={Step1Preferences} />
        <Stack.Screen name="Step2" component={Step2Preferences} />
        <Stack.Screen name="Step3" component={Step3Preferences} />
        <Stack.Screen name="Step4" component={Step4Preferences} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default _layout;

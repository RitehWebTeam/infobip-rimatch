import CurrentUserContextProvider from "../context/CurrentUserProvider";
import { Root } from "./Root";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LayoutTest from "../components/LayoutTest";

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <CurrentUserContextProvider>
      <Root>
        <Stack.Screen name="Layout" component={LayoutTest} />
        {/* <Stack.Screen name="MatchesPage" component={MatchesPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
        <Stack.Screen name="SetupPreferencesPage" component={SetupPreferencesPage} />
        <Stack.Screen name="ListOfMatchesForChatPage" component={ListOfMatchesForChatPage} />
        <Stack.Screen name="ProfileDetailed" component={ProfileDetailed} />
        <Stack.Screen name="SettingsList" component={SettingsList} />
        <Stack.Screen name="SettingsPreferences" component={SettingsPreferences} />
        <Stack.Screen name="SettingsProfile" component={SettingsProfile} />
        <Stack.Screen name="SettingsProfilePicture" component={SettingsProfilePicture} />
        <Stack.Screen name="SettingsTheme" component={SettingsTheme} /> */}
      </Root>
    </CurrentUserContextProvider>
  );
};

export default Layout;

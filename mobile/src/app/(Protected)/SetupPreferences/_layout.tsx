import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import SetupPreferencesPage from "./index";
const _layout = () => {
  return (
    <PreferencesHeader>
      <PaperProvider>
        <NavigationContainer>
          <SetupPreferencesPage />
        </NavigationContainer>
      </PaperProvider>
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
export default _layout;

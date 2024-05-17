import CurrentUserContextProvider from "../context/CurrentUserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import {
   DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeProvider";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFFFFF",
    accent: "#EE5253",
  },
};

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E1E1E",
    secondary: "#FFFFFF",
    accent: "EE5253",
  },
};


//!Main/Root Layout component
const client = new QueryClient();

const Layout = () => {
  
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
useEffect(() => {
    console.log("theme " + colorScheme);
}, [colorScheme]);

  console.log("theme " + colorScheme);
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <CurrentUserContextProvider>
          <ThemeProvider>
          
          
            <Slot />
          
         
          </ThemeProvider>
        </CurrentUserContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}; 

export default Layout;

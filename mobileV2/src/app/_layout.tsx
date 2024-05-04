import CurrentUserContextProvider from "../context/CurrentUserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Slot } from "expo-router";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EF4444',
    secondary: 'yellow',
  },
};

//!Main/Root Layout component
const client = new QueryClient();
const Layout = () => {
  return (
    <QueryClientProvider client={client}>
      <CurrentUserContextProvider>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <Slot />
          </PaperProvider>
        </AuthProvider>
      </CurrentUserContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;

import CurrentUserContextProvider from "../context/CurrentUserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { Slot } from "expo-router";
import { StompSessionProvider } from "react-stomp-hooks";
global.TextEncoder = require("text-encoding").TextEncoder;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#EF4444",
    secondary: "yellow",
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
            <StompSessionProvider
              // @ts-ignore
              url={`${process.env.EXPO_PUBLIC_BACKEND_URL}/ws`}
            >
              <Slot />
            </StompSessionProvider>
          </PaperProvider>
        </AuthProvider>
      </CurrentUserContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;

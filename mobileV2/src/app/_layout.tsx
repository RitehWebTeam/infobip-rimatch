import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { Slot } from "expo-router";
import { StompSessionProvider } from "react-stomp-hooks";
// Needed for StompJS to work in React Native
global.TextEncoder = require("text-encoding").TextEncoder;
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeProvider";

//!Main/Root Layout component
const client = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <StompSessionProvider
            // @ts-ignore
            url={`${process.env.EXPO_PUBLIC_BACKEND_WS_URL}/ws`}
            // Needed for StompJS to work in React Native
            forceBinaryWSFrames={true}
            appendMissingNULLonIncoming={true}
          >
            <Slot />
          </StompSessionProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Layout;

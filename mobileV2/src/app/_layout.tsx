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
      <AuthProvider>
        <PaperProvider theme={theme}>
          <StompSessionProvider
            // @ts-ignore
            url={`ws://18.199.30.172:8080/ws`}
            forceBinaryWSFrames={true}
            appendMissingNULLonIncoming={true}
          >
            <Slot />
          </StompSessionProvider>
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Layout;

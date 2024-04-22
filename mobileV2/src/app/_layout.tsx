import CurrentUserContextProvider from "../context/CurrentUserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

//!Main/Root Layout component
const client = new QueryClient();
const Layout = () => {
  return (
    <QueryClientProvider client={client}>
      <CurrentUserContextProvider>
        <AuthProvider>
          <PaperProvider>
            <Slot />
          </PaperProvider>
        </AuthProvider>
      </CurrentUserContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;

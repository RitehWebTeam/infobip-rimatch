import CurrentUserContextProvider from "../context/CurrentUserProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import { Slot } from "expo-router";

const client = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={client}>
      <CurrentUserContextProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </CurrentUserContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;

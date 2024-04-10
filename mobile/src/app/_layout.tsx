import CurrentUserContextProvider from "../context/CurrentUserProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import { Slot } from "expo-router";

const client = new QueryClient();
//!Main/Root Layout component

const Layout = () => {
  console.log("Loading Root");

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

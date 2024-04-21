import CurrentUserContextProvider from "../context/CurrentUserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthProvider";
import { Slot } from "expo-router";

//!Main/Root Layout component
const client = new QueryClient();
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

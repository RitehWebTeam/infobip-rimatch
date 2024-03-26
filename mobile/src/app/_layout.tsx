import CurrentUserContextProvider from "../context/CurrentUserProvider";
import { Stack } from "expo-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
const Layout = () => {
  return (
    <QueryClientProvider client={client}>
      <CurrentUserContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </CurrentUserContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;

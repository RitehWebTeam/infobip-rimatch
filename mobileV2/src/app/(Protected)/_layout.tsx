import { Redirect, Stack } from "expo-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { View, ActivityIndicator } from "react-native";
import CurrentUserContextProvider from "@/context/CurrentUserProvider";

//!Layout used for checking if user is authenticated
const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.warn(
          "No session found or session expired, redirecting to login."
        );
        console.error((err as Error).message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [auth?.accessToken, refresh]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (!auth?.accessToken) {
    return <Redirect href="/LoginForm" />;
  }

  if (!auth?.active) {
    return <Redirect href="/SetupPreferences" />;
  }

  return (
    <CurrentUserContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CurrentUserContextProvider>
  );
};

export default Layout;

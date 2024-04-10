import { Stack, router } from "expo-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { View, ActivityIndicator } from "react-native";

//!Layout used for checking if user is authenticated
const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  console.log("Layout");
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

  // TODO: Add loading spinner
  if (isLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  console.log("Auth", auth);
  if (!auth?.accessToken) {
    //TODO: Return to if no access token
    console.log("Redirecting to login", auth);
    return router.navigate("/LoginForm");
  }

  return auth?.active ? (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  ) : (
    <Stack>
      <Stack.Screen name="(SetupPreferences)" />
    </Stack>
  );
};

export default Layout;

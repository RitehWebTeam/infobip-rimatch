import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { View, ActivityIndicator } from "react-native";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  //const [isReady, setIsReady] = useState(false);
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

  /* useEffect(() => {
    if(isReady) {
      if (!auth?.accessToken) {
        console.log("Redirecting to login");
        router.navigate("/LoginForm");
      } else if (!auth?.active) {
        console.log("Redirecting to preferences")
        router.navigate("SetupPreferences");
      } else {
        console.log("Redirecting to tabs");
        router.navigate("(tabs)");
      }
    }
   
  }, [auth]); */
  console.log("loading", isLoading);
  // TODO: Add loading spinner
  if (isLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  console.log("loading finished", isLoading);
  return auth?.accessToken ? (
    <Stack>
      <Stack.Screen name="(SetupPreferences)" />
    </Stack>
  ) : (
    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default Layout;

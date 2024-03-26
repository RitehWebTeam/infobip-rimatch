import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { View, ActivityIndicator } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import index from "../app/(tabs)/index";

import Login from "../components/Login";
import LayoutTest from "../components/LayoutTest";

const ProtectedRoutes = () => {
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

  // TODO: Add loading spinner
  if (isLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const Stack = createNativeStackNavigator();

  if (!auth?.accessToken) {
    return <Stack.Screen name="Login" component={Login} />;
  }

  return auth?.active ? (
    <Stack.Screen name="Layout" component={index} />
  ) : (
    <Stack.Screen
      name="Preferences"
      component={LayoutTest}
      options={{ headerShown: false }} // Hide header for the login screen
    />
  );
};

export default ProtectedRoutes;

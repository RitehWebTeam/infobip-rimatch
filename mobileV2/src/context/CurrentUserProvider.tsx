import { UsersService } from "../api/users";
import { createContext } from "react";
import type { User } from "../types/User";
import { View,Text } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
export const CurrentUserContext = createContext<User | null>(null);

const CurrentUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUserQuery = UsersService.useGetCurrentUser();
  if (currentUserQuery.isLoading) {
    return (
      <View style ={{justifyContent:"center", flex:1, alignItems:"center",flexDirection:"row"}}>
         <ActivityIndicator animating={true} color={MD2Colors.red800} />
          <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUserQuery.data ?? null}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;

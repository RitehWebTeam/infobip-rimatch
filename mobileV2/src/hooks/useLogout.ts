import { useNavigation } from "@react-navigation/native"; //*Change to navigate from react native
import useAuth from "./useAuth";
import AuthService from "../api/auth";
import useLocalStorage from "./useLocalStorage";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigation = useNavigation();
  const [, setRefreshToken] = useLocalStorage("refreshToken", "");
  const queryClient = useQueryClient();
  const { mutate: logout } = AuthService.useLogout({
    onSuccess: () => {
      setAuth(null);
      setRefreshToken("");
      queryClient.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: "(Forms)/LoginForm" as never }],
      });
    },
  });

  return logout;
};

export default useLogout;

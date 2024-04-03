import { useNavigation } from "@react-navigation/native"; //*Change to navigate from react native
import useAuth from "./useAuth";
import AuthService from "../api/auth";
import useLocalStorage from "./useLocalStorage";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigation = useNavigation();
  const [, setRefreshToken] = useLocalStorage("refreshToken", "");
  const { mutate: logout } = AuthService.useLogout({
    onSuccess: () => {
      setAuth(null);
      setRefreshToken("");
      navigation.reset({
        index: 0,
        routes: [{ name: "(Forms)/LoginForm" as never }],
      });
    },
  });

  return logout;
};

export default useLogout;

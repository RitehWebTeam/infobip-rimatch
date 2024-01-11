import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  gender: string;
  age: number;
  active: boolean;
  description: string;
  profileImageUrl: string;
  phoneNumber: string;
  location: string;
  preferences: UserPreferences;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

interface UserPreferences {
  ageGroupMin: number;
  ageGroupMax: number;
  partnerGender: string;
}

export interface PreferencesInitData {
  description: string;
  profileImageUrl: string;
  phoneNumber: string;
  location: string;
  preferences: UserPreferences;
}

export const UsersService = {
  useGetCurrentUser() {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    return useQuery<User, Error>({
      queryKey: ["UsersService.getCurrentUser", auth?.accessToken],
      queryFn: () => axios.get("/users/me").then((response) => response.data),
      staleTime: Infinity,
      enabled: !!auth?.accessToken,
    });
  },

  useInitPreferences: <T = void>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, PreferencesInitData>,
      "mutationFn"
    >
  ) => {
    const axios = useAxiosPrivate();
    return useMutation<T, Error, PreferencesInitData>({
      mutationFn: async (data) => {
        const response = await axios.post<T>("/users/me/setup", data, {
          withCredentials: true,
        });
        return response.data;
      },
      ...mutationOptions,
    });
  },

  useGetPotentailUsers: () => {
    const axios = useAxiosPrivate();
    return useQuery<User[], Error>({
      queryKey: ["UsersService.getPotentialUsers"],
      queryFn: () => axios.get("/users/potential").then((res) => res.data),
      staleTime: Infinity,
    });
  },
};

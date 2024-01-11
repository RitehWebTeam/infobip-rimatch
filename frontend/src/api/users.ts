import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
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

interface Match {
  id: string;
  firstUserId: string;
  secondUserId: string;
  accepted?: boolean;
  finished?: boolean;
}
interface MatchData {
  userId: string;
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
      queryFn: () => axios.get("/match/potential").then((res) => res.data),
      staleTime: Infinity,
    });
  },

  useAcceptMatch: <T = Match>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, MatchData>,
      "mutationFn"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, MatchData>({
      mutationFn: async (data) => {
        const response = await axios.post<T>("/match/accept", data);
        return response.data;
      },
      onSuccess: () => {
        return queryClient.invalidateQueries({
          queryKey: ["UsersService.getPotentialUsers"],
        });
      },
      ...mutationOptions,
    });
  },

  useRejectMatch: <T = Match>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, MatchData>,
      "mutationFn"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, MatchData>({
      mutationFn: async (data) => {
        const response = await axios.post<T>("/match/reject", data);
        return response.data;
      },
      onSuccess: () => {
        return queryClient.invalidateQueries({
          queryKey: ["UsersService.getPotentialUsers"],
        });
      },
      ...mutationOptions,
    });
  },
};

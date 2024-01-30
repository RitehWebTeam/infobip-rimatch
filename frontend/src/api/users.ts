import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { Match, MatchData } from "@/types/Match";
import type { PreferencesInitData, ProjectedUser, User } from "@/types/User";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

  useGetMatches: () => {
    const axios = useAxiosPrivate();
    return useQuery<ProjectedUser[], Error>({
      queryKey: ["UsersService.getMatches"],
      queryFn: () => axios.get("/match/all").then((res) => res.data),
      staleTime: 60e3,
    });
  },
};

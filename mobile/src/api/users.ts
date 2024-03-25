import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import type { Match, MatchData } from "../types/Match";
import type {
  PreferencesInitData,
  ProjectedUser,
  User,
  UserUpdateData,
} from "../types/User";
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

  useGetPotentailUsers: (page: number) => {
    const axios = useAxiosPrivate();
    return useQuery<User[], Error>({
      queryKey: ["UsersService.getPotentialUsers", page],
      queryFn: () => axios.get("/match/potential").then((res) => res.data),
      staleTime: 60e3,
    });
  },

  usePrefetchPotentialUsers: (page: number) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();

    const prefetch = () => {
      queryClient.prefetchQuery({
        queryKey: ["UsersService.getPotentialUsers", page + 1],
        queryFn: () =>
          axios.get(`/match/potential?skip=3`).then((res) => res.data),
        staleTime: 60e3,
      });
    };

    return prefetch;
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
      ...mutationOptions,
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["UsersService.getMatches"],
        });
      },
    });
  },

  useRejectMatch: <T = Match>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, MatchData>,
      "mutationFn"
    >
  ) => {
    const axios = useAxiosPrivate();
    return useMutation<T, Error, MatchData>({
      mutationFn: async (data) => {
        const response = await axios.post<T>("/match/reject", data);
        return response.data;
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

  useUpdateUser: <T = void>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, UserUpdateData>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, UserUpdateData>({
      mutationFn: async (data) => {
        // TODO: Please separate this into two different methods, I want to sleep now
        const url = data?.preferences
          ? "/users/me/update/preferences"
          : "/users/me/update/user";
        const finalData = data?.preferences ? data.preferences : data;
        const response = await axios.put<T>(url, finalData);
        return response.data;
      },
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["UsersService.getCurrentUser"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["UsersService.getPotentialUsers"],
          }),
        ]);
      },
      ...mutationOptions,
    });
  },
};

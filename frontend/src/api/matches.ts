import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Match, MatchData } from "@/types/Match";
import { MatchedUser, User } from "@/types/User";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const MatchesService = {
  useGetPotentailUsers: (page: number) => {
    const axios = useAxiosPrivate();
    return useQuery<User[], Error>({
      queryKey: ["MatchesService.getPotentialUsers", page],
      queryFn: () => axios.get("/match/potential").then((res) => res.data),
      staleTime: 60e3,
    });
  },

  usePrefetchPotentialUsers: (page: number) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();

    const prefetch = () => {
      queryClient.prefetchQuery({
        queryKey: ["MatchesService.getPotentialUsers", page + 1],
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
          queryKey: ["MatchesService.getMatches"],
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
    return useQuery<MatchedUser[], Error>({
      queryKey: ["MatchesService.getMatches"],
      queryFn: () => axios.get("/match/all").then((res) => res.data),
      staleTime: 60e3,
    });
  },
};

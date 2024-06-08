import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type {
  MatchedUser,
  PreferencesInitData,
  ProjectedUser,
  User,
  UserUpdateData,
  ReportUserData,
} from "@/types/User";
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
        const form = new FormData();
        form.append(
          "data",
          new Blob([JSON.stringify(data.data)], { type: "application/json" })
        );
        form.append("photo", data.photo);

        const response = await axios.postForm<T>("/users/me/setup", form, {
          withCredentials: true,
        });
        return response.data;
      },
      ...mutationOptions,
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
        // TODO: Separate this into two different methods
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
            queryKey: ["MatchesService.getPotentialUsers"],
          }),
        ]);
      },
      ...mutationOptions,
    });
  },

  useUpdateProfilePicture: <T = void>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, File>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, File>({
      mutationFn: async (file) => {
        const form = new FormData();
        form.append("photo", file);
        const response = await axios.postForm<T>(
          "/users/me/profile-picture",
          form
        );
        return response.data;
      },
      onSuccess: () => {
        return queryClient.invalidateQueries({
          queryKey: ["UsersService.getCurrentUser"],
        });
      },
      ...mutationOptions,
    });
  },

  useAddUserPhotos: <T = void>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, File[]>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, File[]>({
      mutationFn: async (files) => {
        const form = new FormData();
        files.forEach((file) => form.append("photos", file));
        const response = await axios.postForm<T>("/users/me/add-photos", form);
        return response.data;
      },
      onSuccess: () => {
        return queryClient.invalidateQueries({
          queryKey: ["UsersService.getCurrentUser"],
        });
      },
      ...mutationOptions,
    });
  },

  useRemoveUserPhotos: <T = void>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, Array<string>>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, Array<string>>({
      mutationFn: async (urls) => {
        const response = await axios.post<T>("/users/me/remove-photos", urls);
        return response.data;
      },
      onSuccess: () => {
        return queryClient.invalidateQueries({
          queryKey: ["UsersService.getCurrentUser"],
        });
      },
      onMutate: (urls) => {
        queryClient.setQueryData<User | undefined>(
          ["UsersService.getCurrentUser"],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              photos: oldData.photos.filter((photo) => !urls.includes(photo)),
            };
          }
        );
      },
      ...mutationOptions,
    });
  },

  useBlockUser: <T = void>(
    mutationOptions?: Omit<UseMutationOptions<T, Error, string>, "mutationFn">
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, string>({
      mutationFn: async (userId) => {
        const response = await axios.put<T>(`/users/block/${userId}`);
        return response.data;
      },
      onMutate: (userId) => {
        queryClient.setQueryData<MatchedUser[] | undefined>(
          ["MatchesService.getMatches"],
          (oldData) => {
            if (!oldData?.length) return oldData;
            return oldData.filter((user) => user.id !== userId);
          }
        );
      },
      onSettled: () => {
        return queryClient.invalidateQueries({
          queryKey: ["MatchesService.getMatches"],
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["UsersService.getAllBlockedUsers"],
        });
      },
      ...mutationOptions,
    });
  },

  useGetAllBlockedUsers() {
    const axios = useAxiosPrivate();
    return useQuery<Array<ProjectedUser>, Error>({
      queryKey: ["UsersService.getAllBlockedUsers"],
      queryFn: () =>
        axios.get("/users/block/all").then((response) => response.data),
      staleTime: 60e3,
    });
  },

  useReportUser: <T = void>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, ReportUserData>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation<T, Error, ReportUserData>({
      mutationFn: async (data) => {
        const response = await axios.post<T>(
          "/reports/add",
          {},
          { params: data }
        );
        return response.data;
      },
      onSuccess: () => {
        return queryClient.invalidateQueries({
          queryKey: ["UsersService.getCurrentUser"],
        });
      },
      ...mutationOptions,
    });
  },
};

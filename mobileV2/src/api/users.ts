import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  Asset,
  MatchedUser,
  PreferencesInitData,
  User,
  UserUpdateData,
} from "@/types/User";
import ReactNativeBlobUtil from "react-native-blob-util";

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
    const { auth } = useAuth();
    return useMutation<T, Error, PreferencesInitData>({
      mutationFn: async (data) => {
        const response = await ReactNativeBlobUtil.fetch(
          "POST",
          `${axios.defaults.baseURL}/users/me/setup`,
          {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          [
            {
              name: "data",
              data: JSON.stringify(data.data),
              type: "application/json",
            },
            {
              name: "photo",
              filename: data.photo.fileName,
              type: data.photo.type,
              data: data.photo.base64,
            },
          ]
        );

        if (response.respInfo.status >= 400) {
          throw new Error(response.data);
        }
        return response.json();
      },
      onError: (error) => {
        console.error("Mutation error:", error);
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
      UseMutationOptions<T, Error, Asset>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const axios = useAxiosPrivate();
    const { auth } = useAuth();
    const queryClient = useQueryClient();
    return useMutation<T, Error, Asset>({
      mutationFn: async (file) => {
        const response = await ReactNativeBlobUtil.fetch(
          "POST",
          `${axios.defaults.baseURL}/users/me/profile-picture`,
          {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          [
            {
              name: "photo",
              filename: file.fileName,
              type: file.type,
              data: ReactNativeBlobUtil.wrap(file.uri!),
            },
          ]
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
      UseMutationOptions<T, Error, Asset[]>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { auth } = useAuth();
    return useMutation<T, Error, Asset[]>({
      mutationFn: async (files) => {
        const response = await ReactNativeBlobUtil.fetch(
          "POST",
          `${axios.defaults.baseURL}/users/me/add-photos`,
          {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          files.map((file) => ({
            name: "photos",
            filename: file.fileName,
            type: file.type,
            data: ReactNativeBlobUtil.wrap(file.uri!),
          }))
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
      ...mutationOptions,
    });
  },
};

import type {
  MatchedUser,
  PreferencesInitData,
  User,
  UserUpdateData,
} from "@/types/User";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import RNFetchBlob from "rn-fetch-blob";
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
        console.log(auth?.accessToken);
        try {
          const formData = [];

          if (data.photo) {
            const photo = {
              uri: data.photo.uri?.replace("file://", "") ?? "", // Provide a default value of an empty string if `photo.uri` is `undefined`
              type: data.photo.type || "image/jpeg", // Ensure type is set
              name: data.photo.fileName || "photo.jpg", // Ensure name is set
            };

            console.log("Appending photo to formData:", photo);
            formData.push({
              name: "photo",
              filename: photo.name,
              type: photo.type,
              data: RNFetchBlob.wrap(photo.uri),
            });
          }

          const jsonData = JSON.stringify({
            description: data.data.description,
            phoneNumber: data.data.phoneNumber,
            location: data.data.location,
            favouriteSong: data.data.favouriteSong,
            tags: data.data.tags,
            preferences: data.data.preferences,
          });

          console.log("Appending JSON data to formData:", jsonData);
          formData.push({
            name: "data",
            data: jsonData,
          });

          console.log("FormData constructed:", formData);

          const response = await RNFetchBlob.fetch(
            "POST",
            `${axios.defaults.baseURL}/users/me/setup`,
            {
              Authorization: `Bearer ${auth?.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
            formData
          );

          if (response.info().status >= 400) {
            throw new Error(`HTTP Error: ${response.info().status}`);
          }

          return response.json();
        } catch (error) {
          console.error("Error in mutation function:", error);
          throw error;
        }
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
          "/users/me/profilePicture",
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
        const response = await axios.postForm<T>("/users/me/addPhotos", form);
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
        const response = await axios.post<T>("/users/me/removePhotos", urls);
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

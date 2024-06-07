import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import useAuth from "@/hooks/useAuth";
import { MatchedUser } from "@/types/User";
import { Message, MessageImageUploadData, MessageType } from "@/types/Message";
import { Page } from "@/types/Page";
import useCurrentUserContext from "@/hooks/useCurrentUser";
import ReactNativeBlobUtil from "react-native-blob-util";

export const HISTORY_PAGE_SIZE = 15;
export const MESSAGE_PAGE_SIZE = 15;

export const MessagesService = {
  useSendMessage: () => {
    const client = useStompClient();
    const queryClient = useQueryClient();
    const { auth } = useAuth();
    const currentUser = useCurrentUserContext();

    return (content: string, receiverId: string, chatId: string) => {
      if (!client) {
        throw new Error("Stomp client not initialized");
      }

      client.publish({
        destination: `/app/send-message`,
        body: JSON.stringify({
          content,
          receiverId,
          chatId,
          messageType: MessageType.TEXT,
        }),
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      queryClient.setQueryData(
        ["messages", chatId],
        (oldData: Page<Message>) => {
          const newContent = [...oldData.content];
          newContent.unshift({
            id: new Date().getTime().toString() + content,
            content,
            senderId: currentUser.id,
            receiverId,
            chatId,
            timestamp: new Date().toISOString(),
          });
          return { ...oldData, content: newContent };
        }
      );
    };
  },

  useGetMessages: (chatId?: string) => {
    const axios = useAxiosPrivate();

    return useQuery<Page<Message>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["messages", chatId],
      queryFn: () =>
        axios
          .get(`/messages/${chatId}?pageSize=${MESSAGE_PAGE_SIZE}`)
          .then((res) => res.data),
      staleTime: Infinity,
      enabled: !!chatId,
    });
  },

  useGetMessagesHistory: (
    chatId: string,
    lastMessageId: string,
    enabled = true
  ) => {
    const axios = useAxiosPrivate();

    const fetchMessages = async ({ pageParam }: { pageParam: unknown }) => {
      const res = await axios.get<Page<Message>>(
        `/messages/${chatId}?page=${pageParam}&messageId=${lastMessageId}&pageSize=${HISTORY_PAGE_SIZE}`
      );
      return res.data;
    };

    return useInfiniteQuery<Page<Message>>({
      queryKey: ["messages", chatId, "history"],
      queryFn: fetchMessages,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.number + 1 : null,
      staleTime: Infinity,
      enabled: !!chatId && enabled,
    });
  },

  useSubscribeToMessages: (receiverId: string) => {
    const queryClient = useQueryClient();
    useSubscription(`${receiverId}/queue/messages`, (message) => {
      const newMessage = JSON.parse(message.body) as Message;
      queryClient.setQueryData(
        ["messages", newMessage.chatId],
        (oldData: Page<Message>) => {
          const newContent = [...oldData.content];
          newContent.unshift(newMessage);
          return { ...oldData, content: newContent };
        }
      );
      queryClient.setQueryData(
        ["MatchesService.getMatches"],
        (oldData: Array<MatchedUser>) =>
          oldData
            ? [...oldData].sort((a, b) => {
                if (a.chatId === newMessage.chatId) {
                  return -1;
                }
                if (b.chatId === newMessage.chatId) {
                  return 1;
                }
                return 0;
              })
            : oldData
      );
    });
  },

  useUploadImage: <
    Response extends string,
    Err extends Error,
    Args extends MessageImageUploadData,
  >(
    options?: Omit<UseMutationOptions<Response, Err, Args>, "mutationFn">
  ) => {
    const axios = useAxiosPrivate();
    const { auth } = useAuth();

    return useMutation<Response, Err, Args>({
      mutationFn: async (data) => {
        const response = await ReactNativeBlobUtil.fetch(
          "POST",
          `${axios.defaults.baseURL}/messages/upload-image`,
          {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          [
            {
              name: "chatId",
              data: data.chatId,
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
      ...options,
    });
  },
};

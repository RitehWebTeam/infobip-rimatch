import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {Message, MessageImageUploadData} from "@/types/Message";
import {useInfiniteQuery, useMutation, UseMutationOptions, useQuery, useQueryClient,} from "@tanstack/react-query";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import {Page} from "@/types/Page";
import useAuth from "@/hooks/useAuth";
import {MatchedUser} from "@/types/User";

export const HISTORY_PAGE_SIZE = 20;
export const MESSAGE_PAGE_SIZE = 15;

export const MessagesService = {
  useSendMessage: () => {
    const client = useStompClient();
    const queryClient = useQueryClient();
    const {auth} = useAuth();

    return (
      content: string,
      receiverId: string,
      chatId: string
    ) => {
      if (!client) {
        throw new Error("Stomp client not initialized");
      }

      client.publish({
        destination: `/app/send-message`,
        body: JSON.stringify({content, receiverId, chatId}),
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
            senderId: "",
            receiverId,
            chatId,
            timestamp: new Date().toISOString(),
          });
          return {...oldData, content: newContent};
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

  useGetMessagesHistory: (chatId: string, lastMessageId: string) => {
    const axios = useAxiosPrivate();

    const fetchMessages = async ({pageParam}: { pageParam: unknown }) => {
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
          return {...oldData, content: newContent};
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

  useUploadImage: <Response extends string, Err extends Error, Args extends MessageImageUploadData>(
    options?: Omit<UseMutationOptions<Response, Err, Args>, "mutationFn">
  ) => {
    const axios = useAxiosPrivate();

    return useMutation<Response, Err, Args>({
      mutationFn: async ({chatId, photo}) => {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("chatId", chatId);
        const {data} = await axios.postForm<Response>("/messages/upload-image", formData);
        return data;
      },
      ...options,
    });
  }
};

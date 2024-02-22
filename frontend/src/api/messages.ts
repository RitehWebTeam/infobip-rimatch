import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Message } from "@/types/Message";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { Page } from "@/types/Page";
import useAuth from "@/hooks/useAuth";

const HISTORY_PAGE_SIZE = 20;
const MESSAGE_PAGE_SIZE = 15;

export const MessagesService = {
  useSendMessage: () => {
    const client = useStompClient();
    const queryClient = useQueryClient();
    const { auth } = useAuth();

    const sendMessage = (
      content: string,
      receiverId: string,
      chatId: string
    ) => {
      if (!client) {
        throw new Error("Stomp client not initialized");
      }

      client.publish({
        destination: `/app/sendMessage`,
        body: JSON.stringify({ content, receiverId, chatId }),
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
          return { ...oldData, content: newContent };
        }
      );
    };
    return sendMessage;
  },

  useGetMessages: (chatId: string) => {
    const axios = useAxiosPrivate();

    return useQuery<Page<Message>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["messages", chatId],
      queryFn: () =>
        axios
          .get(`/messages/${chatId}?pageSize=${MESSAGE_PAGE_SIZE}`)
          .then((res) => res.data),
      staleTime: Infinity,
    });
  },

  useGetMessagesHistory: (chatId: string, lastMessageId: string) => {
    const axios = useAxiosPrivate();

    const fetchMessages = async ({ pageParam }: { pageParam: unknown }) => {
      const res = await axios.get<Page<Message>>(
        `/messages/${chatId}?page=${pageParam}&messageId=${lastMessageId}&pageSize=${HISTORY_PAGE_SIZE}`
      );
      return res.data;
    };

    return useInfiniteQuery<Page<Message>>({
      queryKey: ["messages.history", chatId],
      queryFn: fetchMessages,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.number + 1 : null,
      staleTime: Infinity,
    });
  },

  useSubscribeToMessages: (chatId: string, receiverId: string) => {
    const queryClient = useQueryClient();
    useSubscription(`${receiverId}/queue/messages`, () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", chatId],
      });
    });
  },
};

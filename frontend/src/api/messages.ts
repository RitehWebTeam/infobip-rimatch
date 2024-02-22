import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Message } from "@/types/Message";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { Page } from "@/types/Page";
import useAuth from "@/hooks/useAuth";

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
            id: "temp",
            content,
            senderId: "",
            receiverId,
            chatId,
            timestamp: new Date(),
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
      queryKey: ["messages", chatId],
      queryFn: () => axios.get(`/messages/${chatId}`).then((res) => res.data),
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

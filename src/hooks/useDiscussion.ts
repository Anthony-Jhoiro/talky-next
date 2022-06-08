import { MessageDto } from "../api/generated";
import { useState } from "react";
import { listMessages, sendMessage } from "../services/social/messages";
import { useMutation } from "react-query";

export const PAGE_FETCH_LIMIT = 10;

export function useDiscussion(
  friendshipId: string,
  initialMessages: MessageDto[] = [],
  initialPreviousCursor: string = new Date().toISOString(),
  initialAfterCursor: string = new Date().toISOString()
) {
  const [previousPageCursor, setPreviousPageCursor] = useState(
    new Date(initialPreviousCursor)
  );
  const [nextPageCursor, setNextPageCursor] = useState(
    new Date(initialAfterCursor)
  );
  const [messages, setMessages] = useState<MessageDto[]>(initialMessages);

  const sendMessageMutation = useMutation(
    ({ content }: { content: string }) =>
      sendMessage({ content, friendshipId: friendshipId as string }),
    {
      onSuccess: (response) => setMessages([...messages, response.data]),
    }
  );

  const _sendMessage = (options: { content: string }) => {
    sendMessageMutation.mutate(options);
  };

  const updateCursors = (newMessagesState: MessageDto[]) => {
    if (newMessagesState.length > 0) {
      setPreviousPageCursor(new Date(newMessagesState[0].createdAt as string));
      setNextPageCursor(
        new Date(
          newMessagesState[newMessagesState.length - 1].createdAt as string
        )
      );
    }
  };

  const fetchPreviousPage = async () => {
    const newMessages = await listMessages({
      friendshipId: friendshipId as string,
      fetch: "BEFORE",
      refDate: previousPageCursor,
      limit: PAGE_FETCH_LIMIT,
    });

    const newMessagesState = [
      ...(newMessages.content as MessageDto[]).filter((m) =>
        messages.findIndex((oldM) => m.id === oldM.id)
      ),
      ...messages,
    ];

    setMessages(newMessagesState);
    updateCursors(newMessagesState);
  };

  const fetchNextPage = async () => {
    const newMessages = await listMessages({
      friendshipId: friendshipId as string,
      fetch: "AFTER",
      refDate: nextPageCursor,
      limit: PAGE_FETCH_LIMIT,
    });

    const newMessagesState = [
      ...messages,
      ...(newMessages.content as MessageDto[]).filter(
        (m) => messages.findIndex((oldM) => m.id === oldM.id) === -1
      ),
    ];

    setMessages(newMessagesState);
    updateCursors(newMessagesState);
  };

  return {
    messages,
    fetchNextPage,
    fetchPreviousPage,
    sendMessage: _sendMessage,
    isSendingMessage: sendMessageMutation.isLoading,
  };
}

import { messageController, ServerParams } from "../../api";
import { MessageRequestDto } from "../../api/generated";

export const MESSAGE_LIST_QUERY_NAME = "messageList";

export interface MessageListOptions {
  friendshipId: string;
  fetch: "AFTER" | "BEFORE";
  refDate: Date;
  limit?: number;
}

export const listMessages = async (
  { friendshipId, fetch, refDate, limit = 20 }: MessageListOptions,
  serverParams?: ServerParams
) => {
  const dateWithHoursDelta = new Date(
    new Date(refDate).setHours(refDate.getHours() + 2)
  );
  const response = await messageController(serverParams).listMessages(
    friendshipId,
    fetch,
    dateWithHoursDelta.toISOString().split("Z")[0] + "000",
    limit
  );

  return {
    ...response.data,
    content: response.data.content?.sort(
      (a, b) =>
        new Date(a.createdAt as string).getTime() -
        new Date(b.createdAt as string).getTime()
    ),
  };
};

export const sendMessage = async (request: MessageRequestDto) => {
  return messageController().postMessage(request);
};

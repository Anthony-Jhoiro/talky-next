import { friendRequestController, ServerParams } from "../../api";
import {
  CreateFriendRequestRequestDto,
  UpdateFriendRequestRequestDto,
  UpdateFriendRequestRequestDtoStatusEnum,
} from "../../api/generated";

export const FRIEND_REQUESTS_QUERY_NAME = "friendRequests";

export const listFriendRequests = async (serverParams?: ServerParams) => {
  const response = await friendRequestController(
    serverParams
  ).listFriendRequests();
  return response.data;
};

export interface UpdateFriendRequestProps {
  requestId: string;
}

const updateFriendRequest = async (
  requestId: string,
  status: UpdateFriendRequestRequestDtoStatusEnum
) => {
  const dto: UpdateFriendRequestRequestDto = {
    status: status,
  };
  return await friendRequestController().updateFriendRequest(requestId, dto);
};

export const denyFriendRequest = ({ requestId }: UpdateFriendRequestProps) => {
  return updateFriendRequest(
    requestId,
    UpdateFriendRequestRequestDtoStatusEnum.DENIED
  );
};

export const acceptFriendRequest = async ({
  requestId,
}: UpdateFriendRequestProps) => {
  return updateFriendRequest(
    requestId,
    UpdateFriendRequestRequestDtoStatusEnum.ACCEPTED
  );
};

export const sendFriendRequest = (request: CreateFriendRequestRequestDto) =>
  friendRequestController().createFriendRequest(request);

import { friendshipControllerV2, ServerParams } from "../../api";

export const FRIENDS_QUERY_NAME = "friends";

export interface ListFriendsOptions {
  page?: number;
  size?: number;
}

export const listFriends = async (
  { page = 0, size = 4 }: ListFriendsOptions,
  serverParams?: ServerParams
) => {
  const response = await friendshipControllerV2(
    serverParams
  ).listFriendsWithPagination(page, size);
  return response.data;
};

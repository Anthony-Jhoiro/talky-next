import { ServerParams, userControllerV2 } from "../../api";

export const FIND_USER_QUERY_NAME = "findUsers";

export interface FindUsersOptions {
  search: string;
  page?: number;
  size?: number;
}

export const findUsers = async (
  { search, page, size }: FindUsersOptions,
  serverParams?: ServerParams
) => {
  const response = await userControllerV2(serverParams).searchUsers(
    search,
    page,
    size
  );
  return response.data;
};

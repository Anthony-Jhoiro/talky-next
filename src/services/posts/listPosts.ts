import { postControllerV2, ServerParams } from "../../api";

export const POSTS_QUERY_NAME = "posts";

export interface ListPostsOptions {
  searchStart: string;
  page?: number;
  size?: number;
}

export const listPosts = async (
  { searchStart, page = 0, size = 4 }: ListPostsOptions,
  serverParams?: ServerParams
) => {
  const response = await postControllerV2(serverParams).listPosts(
    searchStart,
    page,
    size
  );
  return response.data;
};

export type ListUserPostsOptions = {
  authorId: string;
} & ListPostsOptions;

export const listUserPosts = async (
  { searchStart, authorId, page = 0, size = 4 }: ListUserPostsOptions,
  serverParams?: ServerParams
) => {
  const response = await postControllerV2(serverParams).listUserPosts(
    authorId,
    searchStart,
    page,
    size
  );
  return response.data;
};

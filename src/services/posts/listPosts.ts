import { postController, ServerParams } from "../../api";

export const POSTS_QUERY_NAME = "posts";

export interface ListPostsOptions {
  page: number;
  size: number;
}

export const listPosts = async (
  { page = 0, size = 4 }: Partial<ListPostsOptions>,
  serverParams?: ServerParams
) => {
  const response = await postController(serverParams).listPosts(page, size);
  return response.data;
};

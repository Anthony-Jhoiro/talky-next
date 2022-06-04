import { postController } from "../../api";

export const POSTS_QUERY_NAME = "posts";

export interface ListPostsOptions {
  page: number;
  size: number;
}

export const listPosts = async ({
  page = 0,
  size = 4,
}: Partial<ListPostsOptions>) => {
  const response = await postController.listPosts(page, size);
  return response.data;
};

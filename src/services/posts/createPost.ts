import { postController } from "../../api";
import { CreatePostRequestDto } from "../../api/generated";

export interface GetPostAssetUploadLinkOptions {
  extention: string;
}

export const getPostAssetUploadLink = async ({
  extention,
}: GetPostAssetUploadLinkOptions) => {
  const response = await postController().getAssetUploadLink(extention);
  return response.data;
};

export const createPost = (request: CreatePostRequestDto) =>
  postController().createPost(request);

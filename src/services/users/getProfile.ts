import { ServerParams, userController } from "../../api";
import { AxiosError } from "axios";
import { UpdateUserRequestDto } from "../../api/generated";

export const PROFILE_QUERY_NAME = "profile";

export const getProfile = async (serverParams?: ServerParams) => {
  try {
    const response = await userController(serverParams).getCurrentUser();
    return response.data;
  } catch (err: any | AxiosError) {
    return null;
  }
};

export const USER_PROFILE_QUERY_BASE_NAME = "profile_";

export interface GetUserProfile {
  userId: string;
}

export const getUserProfile = async (
  { userId }: GetUserProfile,
  serverParams?: ServerParams
) => {
  try {
    const response = await userController(serverParams).getUserById(userId);
    return response.data;
  } catch (err: any | AxiosError) {
    return null;
  }
};

export interface GetProfilePictureUploadLinkOptions {
  extention: string;
}

export const getProfilePictureUploadLink = async ({
  extention,
}: GetProfilePictureUploadLinkOptions) => {
  const response = await userController().getAssetUploadLink(extention);
  return response.data;
};

export const updateUser = async (request: UpdateUserRequestDto) => {
  return await userController().updateProfile(request);
};

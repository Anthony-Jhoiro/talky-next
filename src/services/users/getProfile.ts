import { ServerParams, userController } from "../../api";

export const PROFILE_QUERY_NAME = "profile";

export const getProfile = async (serverParams?: ServerParams) => {
  const response = await userController(serverParams).getCurrentUser();
  return response.data;
};

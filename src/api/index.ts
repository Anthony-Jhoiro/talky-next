import {
  Configuration,
  ConfigurationParameters,
  DeviceControllerApi,
  FriendRequestControllerApi,
  FriendshipControllerApi,
  FriendshipControllerV2Api,
  MessageControllerApi,
  PostControllerApi,
  PostControllerV2Api,
  UserControllerApi,
  UserControllerV2Api,
} from "./generated";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { IncomingMessage, ServerResponse } from "http";

const TALKY_PROXY_URI = "/api/talky";

const baseUrl = process.env.TALKY_API_ENDPOINT || TALKY_PROXY_URI;

export interface ServerParams {
  req: NextApiRequest | IncomingMessage;
  res: NextApiResponse | ServerResponse;
}

const controllerBuilder = <Controller>(
  basePath: string,
  controller: new (configuration: Configuration) => Controller
) => {
  return (serverParams?: ServerParams) => {
    const configurationParams: ConfigurationParameters = {
      basePath: `${baseUrl}/${basePath}`,
    };

    if (serverParams) {
      const session = getSession(serverParams.req, serverParams.res);
      configurationParams.accessToken = session?.accessToken;
    }

    const configuration = new Configuration(configurationParams);
    return new controller(configuration);
  };
};

// Social endpoint
export const friendRequestController = controllerBuilder(
  "social",
  FriendRequestControllerApi
);
export const friendshipController = controllerBuilder(
  "social",
  FriendshipControllerApi
);

export const friendshipControllerV2 = controllerBuilder(
  "social",
  FriendshipControllerV2Api
);
export const messageController = controllerBuilder(
  "social",
  MessageControllerApi
);

// Post endpoint
export const postController = controllerBuilder("posts", PostControllerApi);
export const postControllerV2 = controllerBuilder("posts", PostControllerV2Api);

// User endpoint
export const userController = controllerBuilder("users", UserControllerApi);
export const userControllerV2 = controllerBuilder("users", UserControllerV2Api);
export const deviceController = controllerBuilder("users", DeviceControllerApi);

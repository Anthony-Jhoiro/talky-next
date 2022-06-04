import {
  Configuration,
  DeviceControllerApi,
  FriendRequestControllerApi,
  FriendshipControllerApi,
  MessageControllerApi,
  PostControllerApi,
  UserControllerApi,
} from "./generated";

const baseUrl = process.env.TALKY_API_ENDPOINT || "/api/talky";

const buildTalkyApiConfiguration = (basePath: string) => {
  return new Configuration({
    basePath: `${baseUrl}/${basePath}`,
  });
};

// Social endpoint
export const friendRequestController = new FriendRequestControllerApi(
  buildTalkyApiConfiguration("social")
);
export const friendshipController = new FriendshipControllerApi(
  buildTalkyApiConfiguration("social")
);
export const messageController = new MessageControllerApi(
  buildTalkyApiConfiguration("social")
);

// Post endpoint
export const postController = new PostControllerApi(
  buildTalkyApiConfiguration("posts")
);

// User endpoint
export const userController = new UserControllerApi(
  buildTalkyApiConfiguration("users")
);
export const deviceController = new DeviceControllerApi(
  buildTalkyApiConfiguration("users")
);

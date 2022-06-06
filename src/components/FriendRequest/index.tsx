import { useMutation, useQueryClient } from "react-query";
import {
  acceptFriendRequest,
  denyFriendRequest,
  FRIEND_REQUESTS_QUERY_NAME,
  UpdateFriendRequestProps,
} from "../../services/social/friendRequests";
import { ProfilePicture } from "../ProfilePicture";
import { FriendRequestDto } from "../../api/generated";
import { LoadingIndicator } from "../LoadingIndicator";

export interface FriendRequestProps {
  friendRequest: FriendRequestDto;
}

export const FriendRequest = ({ friendRequest }: FriendRequestProps) => {
  const queryClient = useQueryClient();

  const acceptFriendRequestMutation = useMutation(
    FRIEND_REQUESTS_QUERY_NAME,
    (options: UpdateFriendRequestProps) => acceptFriendRequest(options),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(FRIEND_REQUESTS_QUERY_NAME),
    }
  );
  const denyFriendRequestMutation = useMutation(
    FRIEND_REQUESTS_QUERY_NAME,
    (options: UpdateFriendRequestProps) => denyFriendRequest(options),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(FRIEND_REQUESTS_QUERY_NAME),
    }
  );

  const accept = () => {
    acceptFriendRequestMutation.mutate({
      requestId: friendRequest.id as string,
    });
  };

  const deny = () => {
    denyFriendRequestMutation.mutate({ requestId: friendRequest.id as string });
  };

  return (
    <div className={"bg-white shadow p-5 flex justify-between flex-wrap gap-3"}>
      {friendRequest.sender && <ProfilePicture user={friendRequest.sender} />}
      <div className={"flex gap-3"}>
        {acceptFriendRequestMutation.isLoading ||
        denyFriendRequestMutation.isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <button
              className={"bg-secondary py-2 px-4 rounded text-white"}
              onClick={deny}
            >
              Deny
            </button>

            <button
              className={"bg-primary py-2 px-4 rounded text-white"}
              onClick={accept}
            >
              Accept
            </button>
          </>
        )}
      </div>
    </div>
  );
};

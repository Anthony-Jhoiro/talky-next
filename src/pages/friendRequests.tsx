import { useQuery } from "react-query";
import {
  FRIEND_REQUESTS_QUERY_NAME,
  listFriendRequests,
} from "../services/social/friendRequests";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { FriendRequest } from "../components/FriendRequest";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";

const FriendRequestsScreen = () => {
  const { data, isFetching } = useQuery(FRIEND_REQUESTS_QUERY_NAME, () =>
    listFriendRequests()
  );

  return (
    <InfiniteScrollContainer
      id={"friendRequestsList"}
      fetchNextPage={() => {}}
      hasNextPage={false}
    >
      <h2 className={"text-2xl font-semibold mb-12"}>Your friend requests</h2>

      {isFetching && (
        <div className={"flex justify-center"}>
          <LoadingIndicator />
        </div>
      )}

      {!isFetching &&
        data &&
        data.size &&
        Array.from(data).map((friendRequest) => (
          <>
            <div key={friendRequest.id}>
              <FriendRequest friendRequest={friendRequest} />
            </div>
          </>
        ))}

      {!isFetching && data && Array.from(data).length === 0 && (
        <div className={"bg-white py-8 px-12 flex flex-col items-center"}>
          <h3 className={"text-2xl mb-3"}>
            You don{"'"}t have any friend requests.
          </h3>
          <Link href={"/"}>
            <button
              className={
                "bg-primary px-4 py-2 text-white flex gap-1 items-center"
              }
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Return to home page</span>
            </button>
          </Link>
        </div>
      )}
    </InfiniteScrollContainer>
  );
};

export default FriendRequestsScreen;

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

const FriendRequestsScreen = () => {
  const { data, isFetching } = useQuery(FRIEND_REQUESTS_QUERY_NAME, () =>
    listFriendRequests()
  );

  return (
    <main
      id={"friendRequestsList"}
      className={
        "container mx-auto bg-gray-100 h-full overflow-y-scroll mt-5 text-center p-8"
      }
    >
      {isFetching && <LoadingIndicator />}

      <h2 className={"text-2xl font-semibold mb-12"}>Your friend requests</h2>

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
    </main>
  );
};

export default FriendRequestsScreen;

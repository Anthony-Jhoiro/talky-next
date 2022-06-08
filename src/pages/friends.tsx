import { useInfiniteQuery } from "react-query";
import { FRIENDS_QUERY_NAME, listFriends } from "../services/social/friends";
import { Fragment } from "react";
import { ProfilePicture } from "../components/ProfilePicture";
import Link from "next/link";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";

const FriendsScreen = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    FRIENDS_QUERY_NAME,
    ({ pageParam }) =>
      listFriends({
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.last ? null : (lastPage.number ?? 0) + 1,
    }
  );

  return (
    <InfiniteScrollContainer
      id={"friends-list"}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage ?? true}
    >
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.content?.map((friendDto) => (
            <div key={friendDto.id} className={"p-2 max-w-5xl basis-1/2"}>
              <Link href={"/discussion/" + friendDto.friendshipId}>
                <div
                  className={
                    "bg-white p-5 shadow hover:shadow-lg transition-shadow cursor-pointer"
                  }
                >
                  <ProfilePicture user={friendDto} />
                </div>
              </Link>
            </div>
          ))}
        </Fragment>
      ))}
    </InfiniteScrollContainer>
  );
};

export default FriendsScreen;

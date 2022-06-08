import { useInfiniteQuery } from "react-query";
import { FRIENDS_QUERY_NAME, listFriends } from "../services/social/friends";
import { Fragment, UIEventHandler } from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { ProfilePicture } from "../components/ProfilePicture";
import Link from "next/link";

const FriendsScreen = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
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

  const onFeedScroll: UIEventHandler<HTMLElement> = ({ currentTarget }) => {
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      currentTarget.scrollHeight - currentTarget.scrollTop ===
        currentTarget.clientHeight
    ) {
      fetchNextPage().then(null);
    }
  };

  return (
    <main
      id={"friends-list"}
      className={"bg-gray-100 container mx-auto h-full mt-5"}
    >
      <div className={"flex flex-col h-full overflow-hidden"}>
        <div
          onScroll={onFeedScroll}
          className={"overflow-y-scroll h-full flex flex-wrap p-5"}
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

          {isFetchingNextPage && <LoadingIndicator />}
        </div>
      </div>
    </main>
  );
};

export default FriendsScreen;

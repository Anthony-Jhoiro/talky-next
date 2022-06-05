import { Fragment, UIEventHandler } from "react";
import { Post } from "../Post";
import { LoadingIndicator } from "../LoadingIndicator";
import { UseInfiniteQueryResult } from "react-query/types/react/types";
import { PagePostDto } from "../../api/generated";

export interface FeedProps {
  infiniteQueryState: UseInfiniteQueryResult<PagePostDto, unknown>;
}

export const Feed = ({
  infiniteQueryState: {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  },
}: FeedProps) => {
  const onFeedScroll: UIEventHandler<HTMLElement> = ({ currentTarget }) => {
    console.log(currentTarget.scrollHeight);
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      currentTarget.scrollHeight - currentTarget.scrollTop ===
        currentTarget.clientHeight
    ) {
      fetchNextPage().then(null);
    }
  };

  if (status === "loading") {
    return (
      <div className={"flex justify-center"}>
        <LoadingIndicator />
      </div>
    );
  }

  if (status === "error") {
    return <p>An error occured, please refresh the page</p>;
  }

  return (
    <div
      onScroll={onFeedScroll}
      className={"w-full overflow-y-scroll flex flex-col items-center"}
    >
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.content?.map((postDto) => (
            <div key={postDto.id} className={"mb-8 w-full max-w-5xl"}>
              <Post post={postDto} />
            </div>
          ))}
        </Fragment>
      ))}

      {isFetchingNextPage && <LoadingIndicator />}
    </div>
  );
};

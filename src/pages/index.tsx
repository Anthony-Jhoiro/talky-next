import type { NextPage } from "next";
import { useInfiniteQuery } from "react-query";
import { listPosts, POSTS_QUERY_NAME } from "../services/posts/listPosts";
import { useState } from "react";
import { Feed } from "../components/Feed";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";

const Home: NextPage = () => {
  const [startDate, _setStartDate] = useState(new Date().toISOString());
  const feedInfiniteQueryState = useInfiniteQuery(
    POSTS_QUERY_NAME,
    ({ pageParam }) =>
      listPosts({
        searchStart: startDate,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.last ? null : (lastPage.number ?? 0) + 1,
    }
  );

  return (
    <InfiniteScrollContainer
      fetchNextPage={feedInfiniteQueryState.fetchNextPage}
      hasNextPage={feedInfiniteQueryState.hasNextPage ?? true}
      id={"feed"}
    >
      <Feed data={feedInfiniteQueryState.data} />
    </InfiniteScrollContainer>
  );
};

export default Home;

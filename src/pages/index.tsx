import type { NextPage } from "next";
import { useInfiniteQuery } from "react-query";
import { listPosts, POSTS_QUERY_NAME } from "../services/posts/listPosts";
import { useState } from "react";
import { Feed } from "../components/Feed";

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
    <main className={"bg-background h-screen pt-5"}>
      <section
        id="feed"
        className={"bg-gray-100 p-5 container mx-auto h-full flex flex-col"}
      >
        <Feed infiniteQueryState={feedInfiniteQueryState} />
      </section>
    </main>
  );
};

export default Home;

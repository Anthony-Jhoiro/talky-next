import { Fragment } from "react";
import { Post } from "../Post";
import { UseInfiniteQueryResult } from "react-query/types/react/types";
import { PagePostDto } from "../../api/generated";

export interface FeedProps {
  data: UseInfiniteQueryResult<PagePostDto, unknown>["data"];
}

export const Feed = ({ data }: FeedProps) => {
  if (!data) return <></>;

  return (
    <>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.content?.map((postDto) => (
            <div key={postDto.id} className={"mb-8 w-full max-w-5xl"}>
              <Post post={postDto} />
            </div>
          ))}
        </Fragment>
      ))}
    </>
  );
};

import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { LoadingIndicator } from "../LoadingIndicator";

export interface InfiniteScrollContainerProps
  extends ComponentPropsWithoutRef<"div"> {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  children: ReactNode;
}

export const InfiniteScrollContainer: FC<InfiniteScrollContainerProps> = ({
  fetchNextPage,
  hasNextPage,
  children,
  ...divProps
}) => {
  return (
    <div
      className={
        "bg-gray-100 px-5 pt-5 container mx-auto h-full flex flex-col overflow-hidden mt-5"
      }
      {...divProps}
    >
      <div className={"h-full w-full overflow-hidden"}>
        <div className={"w-full h-full overflow-y-scroll"}>
          <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            className={"w-full h-full flex flex-col items-center "}
            threshold={250}
            useWindow={false}
            loader={
              <div className={"flex justify-center"}>
                <LoadingIndicator />
              </div>
            }
          >
            {children}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

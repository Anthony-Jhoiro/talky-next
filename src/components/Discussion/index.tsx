import { FC, useEffect, useRef } from "react";
import { FriendshipDto, MessageDto, UserDto } from "../../api/generated";
import Link from "next/link";
import { ProfilePicture } from "../ProfilePicture";
import { FriendshipMessageBubble } from "./FriendshipMessageBubble";
import { DiscussionInput } from "./DiscussionInput";
import clsx from "clsx";
import { LoadingIndicator } from "../LoadingIndicator";
import InfiniteScroll from "react-infinite-scroller";

export interface DiscussionProps {
  messages: MessageDto[];
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  onNewMessage: (req: { content: string }) => void;
  headerUser: UserDto;
  friendship: FriendshipDto;
  isSendingMessage: boolean;
  hasPreviousPage: boolean;
}

export const Discussion: FC<DiscussionProps> = ({
  messages,
  onNewMessage,
  headerUser,
  friendship,
  isSendingMessage,
  fetchPreviousPage,
  fetchNextPage,
  hasPreviousPage,
}) => {
  const messageView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageView.current) {
      const element = messageView.current;
      const scrollHeight = element.scrollHeight;
      const height = element.clientHeight;
      const maxScrollTop = scrollHeight - height;
      element.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [messageView]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNextPage();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNextPage]);

  return (
    <div
      className={
        "flex flex-col h-full overflow-hidden shrink absolute top-0 bottom-0 w-full"
      }
    >
      {/* Discussion header */}
      <div className={"bg-white w-full py-2 px-4"}>
        <Link href={"/profile/" + headerUser.id}>
          <a>
            <ProfilePicture user={headerUser} />
          </a>
        </Link>
      </div>

      <div className={"grow overflow-scroll overflow-x-hidden"}>
        {/* Discussion body */}
        <InfiniteScroll
          loadMore={() => fetchPreviousPage()}
          hasMore={hasPreviousPage}
          isReverse={true}
          className={clsx("w-full h-full")}
          threshold={250}
          useWindow={false}
          loader={
            <div className={"flex justify-center"}>
              <LoadingIndicator />
            </div>
          }
        >
          {friendship &&
            messages.map((messageDto) => (
              <div key={messageDto.id} className={""}>
                <FriendshipMessageBubble
                  friendship={friendship}
                  message={messageDto}
                  otherUserId={headerUser.id as string}
                />
              </div>
            ))}
        </InfiniteScroll>
      </div>

      {/* Discussion input */}
      <div className={"bg-white w-full flex-none"}>
        <DiscussionInput
          onSendMessage={onNewMessage}
          disabled={isSendingMessage}
        />
      </div>
    </div>
  );
};

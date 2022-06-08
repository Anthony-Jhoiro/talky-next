import { FC, useEffect, useRef } from "react";
import { FriendshipDto, MessageDto, UserDto } from "../../api/generated";
import Link from "next/link";
import { ProfilePicture } from "../ProfilePicture";
import { FriendshipMessageBubble } from "./FriendshipMessageBubble";
import { DiscussionInput } from "./DiscussionInput";

export interface DiscussionProps {
  messages: MessageDto[];
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  onNewMessage: (req: { content: string }) => void;
  headerUser: UserDto;
  friendship: FriendshipDto;
  isSendingMessage: boolean;
}

export const Discussion: FC<DiscussionProps> = ({
  messages,
  onNewMessage,
  headerUser,
  friendship,
  isSendingMessage,
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

      {/* Discussion body */}
      <div
        ref={messageView}
        className={"grow overflow-scroll overflow-x-hidden"}
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

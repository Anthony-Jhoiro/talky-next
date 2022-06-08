import { NextPage } from "next";
import { listMessages } from "../../services/social/messages";
import { useRouter } from "next/router";
import {
  FriendshipDto,
  MessageDto,
  ProfileDto,
  UserDto,
} from "../../api/generated";
import { getFriendshipById } from "../../services/social/friends";
import { getProfile } from "../../services/users/getProfile";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Discussion } from "../../components/Discussion";
import { PAGE_FETCH_LIMIT, useDiscussion } from "../../hooks/useDiscussion";

export interface DiscussionScreenProps {
  initialMessages?: MessageDto[];
  initialPreviousCursor?: string;
  initialAfterCursor?: string;
  friendship: FriendshipDto;
  profile: ProfileDto;
}

const DiscussionScreen: NextPage<DiscussionScreenProps> = ({
  friendship,
  profile,
  initialMessages = [],
  initialPreviousCursor = new Date().toISOString(),
  initialAfterCursor = new Date().toISOString(),
}) => {
  const router = useRouter();
  const { friendshipId } = router.query;

  const {
    messages,
    fetchNextPage,
    fetchPreviousPage,
    sendMessage,
    isSendingMessage,
  } = useDiscussion(
    friendshipId as string,
    initialMessages,
    initialPreviousCursor,
    initialAfterCursor
  );

  const otherUser = friendship.friends?.[
    friendship.friends?.findIndex((u) => u.id !== profile.id) ?? 0
  ] as UserDto;

  const doSendMessage = ({ content }: { content: string }) => {
    sendMessage({
      content,
    });
  };

  return (
    <main className={"container mt-5 bg-gray-100 mx-auto h-full relative"}>
      <Discussion
        messages={messages}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        onNewMessage={doSendMessage}
        headerUser={otherUser}
        friendship={friendship}
        isSendingMessage={isSendingMessage}
      />
    </main>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const friendshipId = ctx.params?.friendshipId as string;

    const [friendship, profile, initialMessgePager] = await Promise.all([
      getFriendshipById({ friendshipId: friendshipId as string }, ctx),
      getProfile(ctx),
      (async () => {
        const initialMessagePage = await listMessages(
          {
            friendshipId: friendshipId as string,
            fetch: "BEFORE",
            refDate: new Date(),
            limit: PAGE_FETCH_LIMIT,
          },
          ctx
        );

        const initialMessages = initialMessagePage.content as MessageDto[];
        let initialPreviousCursor, initialAfterCursor;

        if (initialMessages.length > 0) {
          initialPreviousCursor = new Date(
            initialMessages[0].createdAt as string
          );
          initialAfterCursor = new Date(
            initialMessages[initialMessages.length - 1].createdAt as string
          );
        } else {
          initialPreviousCursor = new Date();
          initialAfterCursor = new Date();
        }
        return {
          initialMessages,
          initialPreviousCursor: initialPreviousCursor.toISOString(),
          initialAfterCursor: initialAfterCursor.toISOString(),
        };
      })(),
    ]);

    return {
      props: {
        ...initialMessgePager,
        friendship,
        profile,
      },
    };
  },
});

export default DiscussionScreen;

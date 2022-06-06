import { NextPage } from "next";
import { useInfiniteQuery } from "react-query";
import { getUserProfile } from "../../services/users/getProfile";
import { UserDto } from "../../api/generated";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import {
  listUserPosts,
  POSTS_QUERY_NAME,
} from "../../services/posts/listPosts";
import { Feed } from "../../components/Feed";
import { ProfileCard } from "../../components/ProfileCard";

export interface ProfileScreenProps {
  profile: UserDto;
}

const UserProfileScreen: NextPage<ProfileScreenProps> = ({ profile }) => {
  const [startDate, _setStartDate] = useState(new Date().toISOString());
  const feedInfiniteQueryState = useInfiniteQuery(
    POSTS_QUERY_NAME,
    ({ pageParam }) =>
      listUserPosts({
        authorId: profile?.id as string,
        searchStart: startDate,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.last ? null : (lastPage.number ?? 0) + 1,
      enabled: !!profile,
    }
  );

  return (
    <main
      className={
        "container mx-auto bg-gray-100 p-8 mt-5 h-full overflow-y-scroll"
      }
    >
      <section id="user-profile" className={"w-full mb-8 p-8 bg-white"}>
        <ProfileCard profile={profile} editable={false} />
      </section>

      <section id="user-feed">
        <Feed infiniteQueryState={feedInfiniteQueryState} />
      </section>
    </main>
  );
};

export default UserProfileScreen;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const userId = ctx.params?.userId as string;

    const profile = await getUserProfile(
      { userId },
      { req: ctx.req, res: ctx.res }
    );

    return {
      props: {
        profile,
      },
    };
  },
});

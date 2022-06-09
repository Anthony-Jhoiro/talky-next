import { NextPage } from "next";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  getProfile,
  PROFILE_QUERY_NAME,
} from "../../services/users/getProfile";
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

const ProfileScreen: NextPage<ProfileScreenProps> = ({ profile }) => {
  const { data: profileData } = useQuery(
    PROFILE_QUERY_NAME,
    () => getProfile(),
    {
      initialData: profile,
    }
  );

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
        {profileData && <ProfileCard profile={profileData} editable={true} />}
      </section>

      <section id="user-feed">
        <Feed data={feedInfiniteQueryState.data} />
      </section>
    </main>
  );
};

export default ProfileScreen;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const profile = await getProfile({ req: ctx.req, res: ctx.res });

    return {
      props: {
        profile,
      },
    };
  },
});

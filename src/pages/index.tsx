import type { GetServerSideProps, NextPage } from "next";
import { useQuery } from "react-query";
import { listPosts, POSTS_QUERY_NAME } from "../services/posts/listPosts";
import { PostDto } from "../api/generated";
import { useUser } from "@auth0/nextjs-auth0";
import { getProfile, PROFILE_QUERY_NAME } from "../services/users/getProfile";
import Link from "next/link";

interface HomePageProps {
  ssPosts: PostDto[];
}

const Home: NextPage<HomePageProps> = ({ ssPosts }: HomePageProps) => {
  const user = useUser();
  const { data } = useQuery(POSTS_QUERY_NAME, () => listPosts({}), {
    initialData: ssPosts,
  });

  const { data: profile } = useQuery(PROFILE_QUERY_NAME, () => getProfile(), {
    enabled: !!user.user,
  });

  return (
    <div>
      <h2>User :</h2>
      {user.user && (
        <>
          <p>You are {user.user.name}</p>
          <Link href="/api/auth/logout">Logout</Link>
        </>
      )}
      {!user.user && <Link href="/api/auth/login">Login</Link>}

      <h2>Profile</h2>

      {user.user && (
        <>
          {profile && <pre>{JSON.stringify(profile)}</pre>}

          {!profile && <pre>No profile</pre>}
        </>
      )}

      <h2>Posts :</h2>
      <ul>
        {data && data.map((post) => <li key={post.id}>{post.content}</li>)}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ssPosts: await listPosts({}, ctx),
    },
  };
};

export default Home;

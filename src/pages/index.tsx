import type { GetServerSideProps, NextPage } from "next";
import { useQuery } from "react-query";
import { listPosts, POSTS_QUERY_NAME } from "../services/posts/listPosts";
import { PostDto } from "../api/generated";

interface HomePageProps {
  posts: PostDto[];
}

const Home: NextPage<HomePageProps> = ({ posts }: HomePageProps) => {
  const { data } = useQuery(POSTS_QUERY_NAME, () => listPosts({}), {
    initialData: posts,
  });
  return (
    <div>
      <ul>
        {data && data.map((post) => <li key={post.id}>{post.content}</li>)}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      posts: await listPosts({}),
    },
  };
};

export default Home;

import React from "react";
import { ProfilePicture } from "../ProfilePicture";
import { AssetGrid } from "./AssetGrid";

export type AssetType = "IMAGE" | "PDF_FILE" | "OTHER";

export interface Asset {
  type: AssetType;
  url: string;
}

export interface Post {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  assets: Asset[];
}

export interface PostProps {
  post: Post;
}

export const Post: React.VFC<PostProps> = ({ post }: PostProps) => {
  return (
    <article className={"shadow-lg p-5"}>
      <div className={"pb-4"}>
        <ProfilePicture user={post.author} />
      </div>

      <div>
        <p className={"whitespace-pre-line"}>{post.content}</p>

        <AssetGrid assets={post.assets} />
      </div>
    </article>
  );
};

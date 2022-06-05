import React from "react";
import { ProfilePicture } from "../ProfilePicture";
import { AssetGrid } from "./AssetGrid";
import { PostDto } from "../../api/generated";

export type AssetType = "IMAGE" | "PDF_FILE" | "OTHER";

export interface Asset {
  type: AssetType;
  url: string;
  altText: string;
}

export interface PostProps {
  post: PostDto;
}

export const Post: React.VFC<PostProps> = ({ post }: PostProps) => {
  return (
    <article className={"shadow-lg p-5"}>
      <div className={"pb-4"}>
        {post.author && <ProfilePicture user={post.author} />}
      </div>

      <div>
        <p className={"whitespace-pre-line"}>{post.content}</p>

        <AssetGrid
          assets={
            post.assets?.map((a, i) => ({
              type: "IMAGE",
              url: a,
              altText: `Image posted by ${post.author?.displayedName} ; number ${i}`,
            })) ?? []
          }
        />
      </div>
    </article>
  );
};

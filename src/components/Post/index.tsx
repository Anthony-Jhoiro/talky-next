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

export const Post: React.FC<PostProps> = ({ post }: PostProps) => {
  return (
    <article className={"shadow-lg p-5 max-w-5xl bg-white"}>
      <div className={"pb-4"}>
        {post.author && <ProfilePicture user={post.author} />}
      </div>

      <div>
        <p className={"whitespace-pre-line h-full"}>{post.content}</p>

        <AssetGrid
          identifier={post.id ?? "unknown"}
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

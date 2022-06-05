import Image from "next/image";
import React from "react";
import { Asset } from "./index";

export interface PostAssetProps {
  asset: Asset;
}

export const PostAsset = ({ asset }: PostAssetProps) => {
  if (asset.type == "IMAGE") {
    return (
      <div className={"relative w-full h-full"}>
        <Image
          src={asset.url}
          objectFit={"cover"}
          alt={asset.altText}
          layout={"fill"}
        />
      </div>
    );
  }

  return <div />;
};

import Image from "next/image";
import React from "react";
import { Asset } from "./index";
import { Property } from "csstype";
import ObjectFit = Property.ObjectFit;

export interface PostAssetProps {
  asset: Asset;
  objectFit?: ObjectFit;
}

export const PostAsset = ({ asset, objectFit = "cover" }: PostAssetProps) => {
  if (asset.type == "IMAGE") {
    return (
      <div className={"relative w-full h-full"}>
        <Image
          src={asset.url}
          objectFit={objectFit}
          alt={asset.altText}
          layout={"fill"}
          unoptimized
        />
      </div>
    );
  }

  return <div />;
};

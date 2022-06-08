import fetch from "node-fetch";

export const uploadAsset = (link: string, fileData: ArrayBuffer) =>
  fetch(link, {
    method: "PUT",
    body: fileData,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  }).then(null);

export const extractAssetNameFromLink = (url: string) => {
  return url.split("?")[0].split("/").pop();
};

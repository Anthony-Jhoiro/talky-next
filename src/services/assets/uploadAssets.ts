import fetch from "node-fetch";

export const uploadAsset = (link: string, fileData: ArrayBuffer) =>
  fetch(link, {
    method: "PUT",
    body: fileData,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  }).then(null);

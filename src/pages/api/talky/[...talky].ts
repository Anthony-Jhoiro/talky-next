import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = getSession(req, res);

  const response = await axios.request({
    url: `${process.env.TALKY_API_ENDPOINT}/${
      req.url?.split("/api/talky/")[1]
    }`,
    headers: {
      "Content-Type": req.headers["content-type"] || "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: req.method,
    data: req.body,
  });
  res.status(response.status).json(response.data);
}

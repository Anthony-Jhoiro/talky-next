import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = getSession(req, res);

  try {
    const token = session?.accessToken;

    const response = await axios.request({
      url: `${process.env.TALKY_API_ENDPOINT}/${
        req.url?.split("/api/talky/")[1]
      }`,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method: req.method,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (err: any | AxiosError) {
    if (axios.isAxiosError(err)) {
      res.status(err.response?.status || 500).json({ name: "" });
    } else {
      throw err;
    }
  }
}

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate("/");
    res.json({ revalidated: true });
  } catch {
    res.status(500).send("Revalidation failed");
  }
}

import prisma  from "@app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getEventById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const data = await prisma.event.findFirst({
      where: { id: id as string },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

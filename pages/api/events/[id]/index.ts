import prisma  from "@app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getEventsById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, page } = req.query;
  try {
    const isPageNumber = typeof page === "string" && !Number.isNaN(page)
    console.log({page: 5 + ((+page - 1) * 5)})
    const data = await prisma.event.findMany({
      take: +page === 1 ? 0 : 5,
      skip: isPageNumber ? (+page - 1) * 5 : 0 ,
      where: { eventClusterId: id as string },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

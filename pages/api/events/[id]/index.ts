import prisma from '@app/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getEventsById(req: NextApiRequest, res: NextApiResponse) {
  const { id, page } = req.query;
  try {
    const isPageNumber = typeof page === 'string' && !Number.isNaN(page);
    const data = await prisma.event.findMany({
      // we take the first 5 from the eventsCluster and only when paging we take 5
      take: +page === 1 ? 0 : 5,
      // just make sure we have a valid page number as num
      skip: isPageNumber ? (+page - 1) * 5 : 0,
      where: { eventClusterId: id as string },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

import prisma from '@app/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getEventClusters(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.eventCluster.findMany({
      select: {
        id: true,
        name: true,
        events: {
          take: 5,
        },
        _count: {
          select: {
            events: true,
          },
        },
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    prisma.$disconnect();
  }
}

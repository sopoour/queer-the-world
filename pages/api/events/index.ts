import prisma from '@app/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getEventClusters(req: NextApiRequest, res: NextApiResponse) {
  try {
    const eventClusters = await prisma.eventCluster.findMany({
      select: {
        id: true,
        name: true,
        events: {
          take: 5,
        },
      },
    });

    const eventClusterIds = eventClusters.map((e) => e.id);

    const eventsCount = await prisma.event.groupBy({
      by: ['eventClusterId'],
      where: {
        eventClusterId: {
          in: eventClusterIds,
        },
      },
      _count: {
        id: true,
      },
    });

    const data = eventClusters.map((eventCluster) => {
      const eventCount = eventsCount.find((count) => count.eventClusterId === eventCluster.id);
      return {
        ...eventCluster,
        eventsCount: eventCount._count.id ?? 0,
      };
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    prisma.$disconnect();
  }
}

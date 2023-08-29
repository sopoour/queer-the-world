import useSWR from 'swr';
import { fetcher } from './fetch/useFetch';
import { Prisma } from '@prisma/client';

// * Per default generated Prisma types don't include relational types
// This is a way of making sure I get relational types as well
type EventClustersWithEvents = Prisma.EventClusterGetPayload<{
  include: {
    events: true;
    _count: {
      select: {
        events: true;
      };
    };
  };
}>;

const useEvents = () => {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR<EventClustersWithEvents[]>(`/api/events`, fetcher);

  return {
    events,
    isLoading,
    error,
  };
};

export default useEvents;

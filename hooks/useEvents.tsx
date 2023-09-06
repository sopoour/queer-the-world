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

const sortContinents = (a: EventClustersWithEvents, b: EventClustersWithEvents) => {
  const map = new Map<string, number>();
  map.set('North America', 0);
  map.set('Europe', 1);
  map.set('Asia', 2);
  map.set('South America', 3);
  map.set('Africa', 4);
  map.set('Oceania', 5);
  // @ts-ignore
  if (map.get(a.name) < map.get(b.name)) {
    return -1;
  }
  // @ts-ignore
  if (map?.get(a.name) > map?.get(b.name)) {
    return 1;
  }
  return 0;
};

const useEvents = () => {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR<EventClustersWithEvents[]>(`/api/events`, fetcher);

  return {
    events: events?.sort(sortContinents),
    isLoading,
    error,
  };
};

export default useEvents;

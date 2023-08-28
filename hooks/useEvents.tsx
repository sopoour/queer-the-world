import useSWR from 'swr';
import { fetcher } from './fetch/useFetch';
import { Event, EventCluster } from '@prisma/client';

type Events = EventCluster & {
  events: Event[];
  eventsCount: number;
};

const useEvents = () => {
  const { data: events, error, isLoading } = useSWR<Events[]>(`/api/events`, fetcher);

  return {
    events,
    isLoading,
    error,
  };
};

export default useEvents;

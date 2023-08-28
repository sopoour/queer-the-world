import useSWR from 'swr';
import { fetcher } from './fetch/useFetch';
import { Event } from '@prisma/client';

const useEventsById = (id?: string, pageIndex?: number) => {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR<Event[]>(id ? `/api/events/${id}?page=${pageIndex ?? 1}` : null, fetcher);

  return {
    events,
    isLoading,
    error,
  };
};

export default useEventsById;

import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import data from '../scripts/data.json';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import useEvents from '@app/hooks/useEvents';
import useEventsById from '@app/hooks/useEventsById';
import { Event } from '@prisma/client';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const OpenStreetMap = dynamic(() => import('../components/OpenStreetMap'), {
  ssr: false,
});

const Home: React.FC = () => {
  /* const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 }); */
  const [totalEvents, setTotalEvents] = useState<Event[]>([]);
  const [loadMore, setLoadMore] = useState<string>();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { events } = useEventsById(loadMore, pageIndex);
  const { events: eventClusters, isLoading } = useEvents();

  useEffect(() => {
    if (loadMore && events?.length > 0) setTotalEvents([...(totalEvents ?? []), ...events]);
  }, [loadMore, events]);

  console.log({ totalEvents: totalEvents?.length });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Layout>
      {eventClusters?.map((d) => (
        <>
          <h1> {d.name}</h1>
          <p>{d.eventsCount}</p>
          {(loadMore === d.id ? [...d.events, ...(totalEvents ?? [])] : d.events)?.map((event) => (
            <Grid>
              <p>{event.city}</p>
              <p>{event.name}</p>
              <OpenStreetMap location={event.coordinates as [number, number]} />
            </Grid>
          ))}

          {totalEvents?.length + 5 < d.eventsCount && (
            <button
              onClick={() => {
                setLoadMore(d.id);
                setPageIndex(pageIndex + 1);
              }}
            >
              Load more
            </button>
          )}
        </>
      ))}
    </Layout>
  );
};

export default Home;

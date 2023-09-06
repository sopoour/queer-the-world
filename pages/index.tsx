import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { css, styled } from 'styled-components';
import useEvents from '@app/hooks/useEvents';
import useEventsById from '@app/hooks/useEventsById';
import { Event } from '@prisma/client';
import continents from '@app/components/Continent/assets';
import Image from 'next/image';

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.5fr);
  grid-column-gap: 32px;
  width: 100%;
  height: 100%;

  ${(props) => props.theme.media('sm')`
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 16px;
  `}
`;

const ContinentImage = styled(Image)<{ left?: string; top?: string }>`
  position: static;
  height: auto;
  width: max-content;

  ${({ theme, top, left }) =>
    theme.media('sm')`
      position: absolute;
      top: ${top ?? 0};
      left: ${left ?? 0};
    `}
`;

const Continent = dynamic(() => import('../components/Continent/Continent'), {
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
    // append new events
    // ! this needs to be changed !
    // * Idea: visualize the continents/areas and only start loading events when clicking on it
    // * -> handle that in a component passed down a eventsClusterId
    if (loadMore && events?.length > 0) setTotalEvents([...(totalEvents ?? []), ...events]);
  }, [loadMore, events]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Root>
      {eventClusters
        ?.filter((e) => e.name !== 'Worldwide')
        .map((cluster) => {
          const continentAsset = continents.find((c) => c.name === cluster.name);
          return (
            <Continent
              coordinates={cluster.coordinates as [number, number]}
              key={`root-${cluster.name}`}
            >
              <ContinentImage
                width={0}
                height={0}
                sizes="100vw"
                src={continentAsset?.image?.src}
                alt={continentAsset?.name}
                top={continentAsset?.top}
                left={continentAsset?.left}
              />
            </Continent>
          );
        })}
    </Root>
  );

  /* return (
    <>
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
    </>
  ); */
};

export default Home;

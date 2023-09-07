import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { css, styled } from 'styled-components';
import useEvents from '@app/hooks/useEvents';
import useEventsById from '@app/hooks/useEventsById';
import { Event } from '@prisma/client';
import continents from '@app/components/Continent/assets';
import Image from 'next/image';

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const ContinentImage = styled(Image)<{ left?: string; top?: string; right?: string }>`
  position: absolute;
  height: auto;
  width: max-content;
  max-width: 100px;
  max-height: 300px;
  top: ${({ top }) => `calc(${(top === '0px' ? top : top + ' - 10px') ?? 'auto'})`};
  left: ${({ left }) => `calc(${(left === '0px' ? left : left + ' - 200px') ?? 'auto'})`};
  right: ${({ right }) => `calc(${(right === '0px' ? right : right + ' - 25px') ?? 'auto'})`};

  ${({ theme, top, left, right }) =>
    theme.media('sm')`
    max-width: 250px;
  max-height: 300px;
      top: calc(${top + ' + 50px' ?? 'auto'});
      left: calc(${left + ' + 25px' ?? 'auto'});
      right: calc(${right + ' + 25px' ?? 'auto'});
    `}

  ${({ theme, top, left, right }) =>
    theme.media('md')`
    max-width: 350px;
  max-height: 300px;
      top: ${top ?? 'auto'};
      left: ${left ?? 'auto'};
      right: ${right ?? 'auto'};
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
                right={continentAsset?.right}
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

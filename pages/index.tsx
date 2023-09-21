'use client';
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { styled } from 'styled-components';
import useEvents from '@app/hooks/useEvents';
import ContinentGroup from '@app/components/ContinentGroup';

const Root = styled.div`
  width: 100%;
  margin: 0 auto;
  transition: transform 0.5s ease 0.3s;
  transform: scale(1);
`;

const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const Home: React.FC = () => {
  const [activeContinent, setActiveContinent] = useState<string>('');
  const { events: eventClusters, isLoading } = useEvents();

  const focusedContinent = useMemo(
    () => eventClusters?.find((continet) => continet.name === activeContinent),
    [activeContinent]
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <Root>
      {activeContinent.length > 0 && focusedContinent ? (
        <LeafletMap
          coordinates={focusedContinent.coordinates as [number, number]}
          events={focusedContinent.events}
          continentName={focusedContinent.name}
        />
      ) : (
        <ContinentGroup onContinentClick={setActiveContinent} />
      )}
    </Root>
  );
};

export default Home;

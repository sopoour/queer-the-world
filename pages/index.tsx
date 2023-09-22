import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { css, styled } from 'styled-components';
import useEvents from '@app/hooks/useEvents';
import ContinentGroup from '@app/components/ContinentGroup';

const Root = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const Transition = styled.span<{ $active: boolean }>`
  opacity: 0;
  position: relative;
  top: 0;
  ${({ $active }) =>
    $active &&
    css`
      opacity: 1;
      transition: all 0.5s ease 500ms;
    `};
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
      <Transition $active={activeContinent.length > 0 && !!focusedContinent}>
        {activeContinent.length > 0 && !!focusedContinent && (
          <LeafletMap
            coordinates={focusedContinent?.coordinates as [number, number]}
            events={focusedContinent?.events}
            continentName={focusedContinent?.name}
            onHideMap={() => setActiveContinent('')}
          />
        )}
      </Transition>

      <ContinentGroup onContinentClick={setActiveContinent} activeContinent={activeContinent} />
    </Root>
  );
};

export default Home;

import { styled } from 'styled-components';
import SvgStyling from './SvgStyling';
import continents from './assets';
import { FC, useState } from 'react';
import useEvents from '@app/hooks/useEvents';
import { Event } from '@prisma/client';

const Continent = styled.g`
  &:hover {
    cursor: pointer;
    filter: opacity(0.75);
  }
`;

type Props = {
  onContinentClick: (name: string) => void;
};

const ContinentGroup: FC<Props> = ({ onContinentClick }) => {
  // TODO: place totalEvents number on top of each continent
  const [totalEvents, setTotalEvents] = useState<Event[]>([]);
  return (
    <svg
      width="100%"
      height="565"
      viewBox="0 0 1102 565"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="world-map"
    >
      {continents.map((continent) => (
        <Continent
          key={continent.name}
          aria-label={continent.name.toLowerCase().replace(/ /g, '-')}
          onClick={() => onContinentClick(continent.name)}
        >
          <continent.component />
        </Continent>
      ))}
      <SvgStyling />
    </svg>
  );
};

export default ContinentGroup;

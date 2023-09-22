import { css, styled } from 'styled-components';
import SvgStyling from './SvgStyling';
import continents from './assets';
import { FC, useEffect, useState } from 'react';
import { Event } from '@prisma/client';

const Svg = styled.svg<{ $active: boolean }>`
  position: absolute;
  top: 0;
  opacity: 1;
  transition: all 0.5s ease-in-out;
  ${({ $active }) =>
    $active &&
    css`
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s ease 500ms;
    `}
`;

const Continent = styled.g<{ $active: boolean; $hide: boolean }>`
  ${({ $hide }) =>
    $hide &&
    css`
      opacity: 0;
      transition: opacity 0.5s ease;
    `}
  ${({ $active }) =>
    $active &&
    css`
      transition: transform 0.5s ease;
      transform: scale(1.1);
    `}
  &:hover {
    cursor: pointer;
    filter: opacity(0.75);
  }
`;

type Props = {
  onContinentClick: (name: string) => void;
  activeContinent: string;
};

const ContinentGroup: FC<Props> = ({ onContinentClick, activeContinent }) => {
  // TODO: place totalEvents number on top of each continent
  const [totalEvents, setTotalEvents] = useState<Event[]>([]);
  // added to make the UX quicker
  const [active, setActive] = useState(activeContinent);

  // added to make the go back button clear the status
  useEffect(() => setActive(activeContinent), [activeContinent]);

  return (
    <Svg
      width="100%"
      height="565"
      viewBox="0 0 1102 565"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="world-map"
      $active={active.length > 0}
    >
      {continents.map((continent) => (
        <Continent
          key={continent.name}
          aria-label={continent.name.toLowerCase().replace(/ /g, '-')}
          onClick={() => {
            setActive(continent.name);
            setTimeout(() => {
              onContinentClick(continent.name);
            }, 400);
          }}
          $active={continent.name === active}
          $hide={active.length > 0 && continent.name !== active}
        >
          <continent.component />
        </Continent>
      ))}
      <SvgStyling />
    </Svg>
  );
};

export default ContinentGroup;

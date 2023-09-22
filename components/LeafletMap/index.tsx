import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { css, styled } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import { MdLocationOn } from 'react-icons/md';
import { IoIosArrowRoundBack } from 'react-icons/io';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Event } from '@prisma/client';

const LocationIcon = styled(MdLocationOn)`
  && {
    width: 18px;
    height: 18px;

    path:last-of-type {
      fill: #fecaff;
      stroke: #06787f;
      stroke-width: 1px;
    }
  }
`;

const Pin = L.divIcon({
  html: ReactDOMServer.renderToString(<LocationIcon />),
  className: '',
});

const StyledMapContainer = styled(MapContainer)`
  && {
    width: 100%;
    height: 565px;
    border-radius: 10px !important;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #cafffc;
  border: 1px solid #06787f;
  padding: 4px 8px;
  border-radius: 6px;
  margin-top: 8px;
  margin-right: 8px;
  pointer-events: all !important;
  color: #06787f;
  font-weight: 600;
  font-size: 12px;
  &:hover {
    filter: brightness(0.95);
  }

  svg {
    width: 20px;
    height: 15px;
  }
`;

type Props = {
  coordinates?: [number, number];
  events?: Event[];
  continentName: string;
  onHideMap: () => void;
};

const LeafletMap: FC<Props> = ({ coordinates, events, continentName, onHideMap }) => (
  <StyledMapContainer
    center={coordinates as [number, number]}
    zoom={2.5}
    scrollWheelZoom={false}
    aria-labelledBy={`Open street map centered around ${continentName}`}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
    />
    <BackButton className="leaflet-top leaflet-right" onClick={onHideMap}>
      <IoIosArrowRoundBack /> Go Back
    </BackButton>
    {events?.map((event) => {
      if (event.coordinates?.length < 2) {
        return null;
      }
      return (
        <Marker
          position={event.coordinates as [number, number]}
          icon={Pin}
          key={event.name}
          riseOnHover
          title={event.name}
          alt={event.name}
        >
          <Popup>{event.name}</Popup>
        </Marker>
      );
    })}
  </StyledMapContainer>
);

export default LeafletMap;

import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { styled } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import { MdLocationOn } from 'react-icons/md';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Event } from '@prisma/client';

const LocationIcon = styled(MdLocationOn)`
  && {
    width: 18px;
    height: 18px;

    path:last-of-type {
      fill: #cafffc;
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
    height: 400px;
    border-radius: 10px !important;
  }
`;

type Props = {
  coordinates: [number, number];
  events: Event[];
};

const LeafletMap: FC<Props> = ({ coordinates, events }) => (
  <StyledMapContainer center={coordinates as [number, number]} zoom={2} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
    />
    {events.map((event) => {
      if (event.coordinates?.length < 2) {
        return null;
      }
      return (
        <Marker
          position={event.coordinates as [number, number]}
          icon={Pin}
          key={event.name}
          riseOnHover
        >
          <Popup>{event.name}</Popup>
        </Marker>
      );
    })}
  </StyledMapContainer>
);

export default LeafletMap;

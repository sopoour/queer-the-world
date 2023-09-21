import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { styled } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import { FaLocationDot } from 'react-icons/fa6';
import L from 'leaflet';
import { Event } from '@prisma/client';

const StyledMapContainer = styled(MapContainer)`
  && {
    height: 400px;
    border-radius: 10px !important;
  }
`;

const StyledMarker = styled(Marker)`
  > div {
    border: red !important;
  }
`;

const Pin = L.divIcon({
  iconSize: [20, 20],
  html: ReactDOMServer.renderToString(<FaLocationDot />),
});

type Props = {
  coordinates: [number, number];
  events: Event[];
};

const LeafletMap: FC<Props> = ({ coordinates, events }) => (
  <MapContainer center={coordinates as [number, number]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
    />
    {/* {events.map((event) => (
      <StyledMarker position={event.coordinates as [number, number]} icon={Pin} key={event.name}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </StyledMarker>
    ))} */}
  </MapContainer>
);

export default LeafletMap;

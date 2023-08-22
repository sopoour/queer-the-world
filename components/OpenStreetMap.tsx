import React, { useState, useRef, FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from '@emotion/styled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReactDOMServer from 'react-dom/server';

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
  html: ReactDOMServer.renderToString(<LocationOnIcon />),
});

const OpenStreetMap: FC = () => {
  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  return (
    <>
      <LocationOnIcon />
      <StyledMapContainer center={[40.71427, -74.00597]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />

        <StyledMarker position={[40.71427, -74.00597]} icon={Pin}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </StyledMarker>
      </StyledMapContainer>
    </>
  );
};

export default OpenStreetMap;

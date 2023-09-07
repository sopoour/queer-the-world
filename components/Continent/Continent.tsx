import React, { useState, useRef, FC, useEffect, ReactElement } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { styled } from 'styled-components';
import { FaLocationDot } from 'react-icons/fa6';
import ReactDOMServer from 'react-dom/server';

const Root = styled.div`
  position: relative;
`;

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
  children: ReactElement;
};

const Continent: FC<Props> = ({ coordinates, children }) => {
  const [center, setCenter] = useState<[number, number]>(coordinates);
  const [mapSeen, setMapSeen] = useState<boolean>(false);
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  if (center?.length < 2) {
    return null;
  }

  return (
    <Root
      onClick={() => {
        setMapSeen((prev) => !prev);
        setCenter(coordinates);
      }}
    >
      {mapSeen ? (
        <StyledMapContainer center={center} zoom={2} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          />
          <StyledMarker position={center} icon={Pin}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </StyledMarker>
        </StyledMapContainer>
      ) : (
        <>{children}</>
      )}
    </Root>
  );
};

export default Continent;

import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Places } from '@/store';
import { useSelector } from 'react-redux';
import { Place } from '@/store/types';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface MapsProps {
  centerplace?: Place;
}

export const Maps = ({ centerplace }: MapsProps) => {
  const [, setMap] = React.useState<google.maps.Map | null>(null);
  const places = useSelector(Places.selectPlaces);

  const onLoad = React.useCallback(mapLoad => {
    const bounds = new window.google.maps.LatLngBounds();
    mapLoad.fitBounds(bounds);
    setMap(mapLoad);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerplace?.geo}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerClassName="h-full w-full"
    >
      {places.map(mak => (
        <Marker position={mak.geo} key={mak.id} />
      ))}
      <></>
    </GoogleMap>
  );
};

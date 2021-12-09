import React, { useEffect } from 'react';
import { fetchPlaces } from './common/api/places';
import { useMaps } from './common/hooks/use-maps';
import { Places, useAppDispatch } from './store';

export const Loader: React.FC<any> = ({ children }) => {
  const { isLoaded } = useMaps();
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchPlaces()
    .then(places => dispatch(Places.addAll(places)))
  }, [])

  return isLoaded ? children : <></>;
};

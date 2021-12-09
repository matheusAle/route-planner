import React, { useRef } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { Places, useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';

export const Search = () => {
  const searchBox = useRef<StandaloneSearchBox>(null);
  const dispatch = useAppDispatch();
  const places = useSelector(Places.selectPlaces)
  const onPlacesChanged = () => {
    const [place] = searchBox.current?.state.searchBox?.getPlaces() || [];
    console.log(place);
    if (place)
      dispatch(
        Places.addPlace({
          id: place.place_id || '',
          address: place.formatted_address || place.name || '',
          name: place.name || '',
          url: place.url || '',
          geo: {
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
          },
          order: places[places.length - 1].order + 65536
        }),
      );
  };

  return (
    <div data-standalone-searchbox="">
      <StandaloneSearchBox ref={searchBox} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Buscar Lugar"
          className="w-full px-3 py-2 border-b-2 border-blue-500 outline-none"
        />
      </StandaloneSearchBox>
    </div>
  );
};

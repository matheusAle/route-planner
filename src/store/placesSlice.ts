import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Place } from './types';

export const placesAdapter = createEntityAdapter<Place>({
  selectId: marker => marker.id || '',
  sortComparer: (a, b) => a.address?.localeCompare(b.address || ''),
});

export const placesSlice = createSlice({
  name: 'places',
  initialState: placesAdapter.getInitialState(),
  reducers: {
    addPlace: placesAdapter.addOne,
  },
});

export const { addPlace } = placesSlice.actions;

const globalizedSelectors = placesAdapter.getSelectors(
  (state: RootState) => state.places,
);
export const selectPlaces = (state: RootState) =>
  globalizedSelectors.selectAll(state);

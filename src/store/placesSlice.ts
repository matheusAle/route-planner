import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { Place } from './types';

export const placesAdapter = createEntityAdapter<Place>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: marker => marker.id || '',
  // Keep the "all IDs" array sorted based on book titles
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

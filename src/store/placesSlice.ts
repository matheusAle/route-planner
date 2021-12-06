import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Place } from './types';

export const placesAdapter = createEntityAdapter<Place>({
  selectId: marker => marker.id || '',
  sortComparer: (a, b) => a.address?.localeCompare(b.address || ''),
});

const emptyInitialState = placesAdapter.getInitialState();
const filledState = placesAdapter.upsertMany(emptyInitialState, [
  {
    id: 'ChIJJ58ra3LmhpQRwdKEvJ5GqPU',
    address: 'Campo Grande, MS, Brasil',
    name: 'Campo Grande',
    url: 'https://maps.google.com/?q=Campo+Grande,+MS,+Brasil&ftid=0x9486e6726b2b9f27:0xf5a8469ebc84d2c1',
    geo: { lat: -20.4648517, lng: -54.6218477 },
  },
  {
    id: 'ChIJ1zLGsk45J5URRscEagtVvIE',
    address: 'Florianópolis, SC, Brasil',
    name: 'Florianópolis',
    url: 'https://maps.google.com/?q=Florian%C3%B3polis,+SC,+Brasil&ftid=0x9527394eb2c632d7:0x81bc550b6a04c746',
    geo: { lat: -27.5948036, lng: -48.5569286 },
  },
  {
    id: 'ChIJwSq-1Q4yJ5URBqqQnTsWhz0',
    address: 'Palhoça, SC, Brasil',
    name: 'Palhoça',
    url: 'https://maps.google.com/?q=Palho%C3%A7a,+SC,+Brasil&ftid=0x9527320ed5be2ac1:0x3d87163b9d90aa06',
    geo: { lat: -27.6411215, lng: -48.6789533 },
  },
  {
    id: 'ChIJ114784fJ2JQR9mLIZh-2P1s',
    address: 'Praia Brava, Itajaí - SC, Brasil',
    name: 'Praia Brava',
    url: 'https://maps.google.com/?q=Praia+Brava,+Itaja%C3%AD+-+SC,+Brasil&ftid=0x94d8c987f33b5ed7:0x5b3fb61f66c862f6',
    geo: { lat: -26.9532541, lng: -48.6312964 },
  },
  {
    id: 'ChIJw0uFoB_MJpUR2RMlyLG1W4Q',
    address: 'Praia do Rosa, Santa Catarina, Brasil',
    name: 'Praia do Rosa',
    url: 'https://maps.google.com/?cid=9537416411058869209',
    geo: { lat: -28.1300744, lng: -48.64210019999999 },
  },
]);
export const placesSlice = createSlice({
  name: 'places',
  initialState: filledState,
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

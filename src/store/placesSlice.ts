import {Place} from '@/common/api/types/place'
import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {RootState} from '.'

export const placesAdapter = createEntityAdapter<Place>({
  selectId: marker => marker.id || '',
  sortComparer: (a, b) => a.order - b.order,
})

export const placesSlice = createSlice({
  name: 'places',
  initialState: placesAdapter.getInitialState(),
  reducers: {
    addPlace: placesAdapter.addOne,
    addAll: placesAdapter.addMany,
    update: placesAdapter.updateOne,
    remove: placesAdapter.removeOne,
  },
})

export const {addPlace, addAll, update, remove} = placesSlice.actions

const globalizedSelectors = placesAdapter.getSelectors(
  (state: RootState) => state.places,
)
export const selectPlaces = (state: RootState) =>
  globalizedSelectors.selectAll(state)

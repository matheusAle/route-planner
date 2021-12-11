import React, {useRef} from 'react'
import {StandaloneSearchBox} from '@react-google-maps/api'
import {Place} from '@/common/types/place'
import {useAddPlace} from '../../hooks/use-add-place'

export const Search = () => {
  const searchBox = useRef<StandaloneSearchBox>(null)
  const addPlace = useAddPlace()
  // const dispatch = useAppDispatch()
  // const places = useSelector(Places.selectPlaces)
  const onPlacesChanged = () => {
    const [selection] = searchBox.current?.state.searchBox?.getPlaces() || []

    addPlace({
      id: selection.place_id || '',
      address: selection.formatted_address || selection.name || '',
      name: selection.name || '',
      url: selection.url || '',
      geo: {
        lat: selection.geometry?.location?.lat() || 0,
        lng: selection.geometry?.location?.lng() || 0,
      },
    })
  }

  return (
    <div data-standalone-searchbox="" className="form-control">
      <StandaloneSearchBox ref={searchBox} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Buscar Lugar"
          className="input input-bordered input-primary w-full"
        />
      </StandaloneSearchBox>
    </div>
  )
}

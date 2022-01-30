import {useRef} from 'react'
import {StandaloneSearchBox} from '@react-google-maps/api'
import {useAddPlace} from '../../hooks/use-add-place'
import {getUid} from 'common/utils/uid'

export const Search = () => {
  const searchBox = useRef<StandaloneSearchBox>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const addPlace = useAddPlace()

  const onPlacesChanged = () => {
    if (!searchBox.current) return
    const [selection] = searchBox.current.state.searchBox?.getPlaces() || []
    addPlace({
      uid: getUid(),
      place_id: selection.place_id || '',
      address: selection.formatted_address || selection.name || '',
      name: selection.name || '',
      url: selection.url || '',
      geo: {
        lat: selection.geometry?.location?.lat() || 0,
        lng: selection.geometry?.location?.lng() || 0,
      },
      stayTime: 1000 * 60 * 60,
    })
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div data-standalone-searchbox="" className="form-control">
      <StandaloneSearchBox ref={searchBox} onPlacesChanged={onPlacesChanged}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search somewhere..."
          className="input input-bordered input-primary w-full"
        />
      </StandaloneSearchBox>
    </div>
  )
}

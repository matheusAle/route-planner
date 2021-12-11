import {Place} from '@/common/types/place'
import {Maps} from '@/pages/planer/maps'
import {useMaps} from '@/common/hooks/use-maps'
import {useState} from 'react'
import {usePlaces} from './hooks/use-places'
import {useTravel} from './hooks/use-travel'
import {Search} from './common/search'
import {PlanerContextProvider} from './hooks/use-planer'
import {Places} from './places'

export const PlanerPage = () => {
  const {travel, isTravelLoading} = useTravel()
  const {isLoaded} = useMaps()
  const {places, isPlacesLoading} = usePlaces(travel)
  const [selectedPlace, setSelectedPlace] = useState<Place>()

  if (isTravelLoading || isPlacesLoading || !isLoaded) return <>loading...</>

  return (
    <PlanerContextProvider
      selectPlace={setSelectedPlace}
      selectedPlace={selectedPlace}
      places={places}
      travel={travel}
    >
      <div className="grid grid-cols-shell h-screen">
        <div className="card">
          <div className="card-body">
            <Search />
            <Places />
          </div>
        </div>
        <Maps />
      </div>
    </PlanerContextProvider>
  )
}

import {Place} from 'common/types/place'
import {Maps} from 'pages/planer/maps'
import {useMaps} from 'common/hooks/use-maps'
import {useState} from 'react'
import {usePlaces} from './hooks/use-places'
import {useTravel} from './hooks/use-travel'
import {PlanerContextProvider} from './hooks/use-planer'
import {Places} from './places'
import {ScreenLayout} from 'common/components/screen-layout'
import {PlacesModal} from './common/places-modal'
import {Timeline} from './timeline'
import {Travel} from './common/travel'

export const PlanerPage = () => {
  const {travel, isTravelLoading} = useTravel()
  const {isLoaded} = useMaps()
  const {places, isPlacesLoading} = usePlaces(travel)
  const [selectedPlace, setSelectedPlace] = useState<Place>()
  const [directions, setDirections] = useState<google.maps.DirectionsResult>()
  if (isTravelLoading || isPlacesLoading || !isLoaded) return <>loading...</>

  return (
    <PlanerContextProvider
      selectPlace={setSelectedPlace}
      selectedPlace={selectedPlace}
      places={places}
      travel={travel}
      directions={directions}
      setDirections={setDirections}
    >
      <ScreenLayout.Desktop>
        <div className="grid grid-rows-shell h-screen">
          <div className="grid grid-cols-shell">
            <div className="card">
              <div className="card-body">
                <Travel />
                <Places />
              </div>
            </div>
            <Maps />
          </div>
          <Timeline />
        </div>
      </ScreenLayout.Desktop>
      <ScreenLayout.NotAnDesktop>
        <div className="h-screen">
          <Maps />
        </div>
        <PlacesModal>
          <Travel />
          <Places />
        </PlacesModal>
      </ScreenLayout.NotAnDesktop>
    </PlanerContextProvider>
  )
}

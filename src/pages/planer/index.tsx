import {Place} from '@/common/types/place'
import {Maps} from '@/pages/planer/maps'
import {useMaps} from '@/common/hooks/use-maps'
import {useState} from 'react'
import {usePlaces} from './hooks/use-places'
import {useTravel} from './hooks/use-travel'
import {PlanerContextProvider} from './hooks/use-planer'
import {Places} from './places'
import {ScreenLayout} from '@/common/components/screen-layout'
import {Modal} from '@/common/components/modal'
import {MdChevronLeft} from 'react-icons/md'
import {cn} from '@/common/utils/classnames'
import {PlacesModal} from './common/places-modal'

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
      <ScreenLayout.Desktop>
        <div className="grid grid-cols-shell h-screen">
          <div className="card">
            <div className="card-body">
              <Places />
            </div>
          </div>
          <Maps />
        </div>
      </ScreenLayout.Desktop>
      <ScreenLayout.NotAnDesktop>
        <div className="h-screen">
          <Maps />
        </div>
        <PlacesModal>
          <Places />
        </PlacesModal>
      </ScreenLayout.NotAnDesktop>
    </PlanerContextProvider>
  )
}

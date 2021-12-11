import {Place} from '@/common/api/types/place'
import {Maps} from '@/common/components/maps'
import {PlaceCard} from '@/common/components/place-card'
import {Search} from '@/common/components/search'
import {VirtualList} from '@/common/components/virtual-list'
import {usePlacesMutation} from '@/common/hooks/use-places-mutation'
import {Places} from '@/store'
import {useState} from 'react'
import {useSelector} from 'react-redux'

export const PlanerPage = () => {
  const places = useSelector(Places.selectPlaces)
  const [selectedPlace, setSelectedPlace] = useState<Place>()
  const {updatePlace} = usePlacesMutation()

  return (
    <div className="grid grid-cols-shell h-screen">
      <div>
        <Search />
        <VirtualList
          data={places}
          sorted={(item, order) => {
            updatePlace({...item, order})
          }}
          itemRender={({item}) => (
            <PlaceCard
              place={item}
              key={item.id}
              onClick={() => setSelectedPlace(item)}
            />
          )}
        />
      </div>
      <Maps centerplace={selectedPlace} />
    </div>
  )
}

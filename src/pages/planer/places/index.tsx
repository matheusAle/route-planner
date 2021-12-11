import {VirtualList} from '@/common/components/virtual-list'
import {PlaceCard} from '../common/place-card'
import {usePlaner} from '../hooks/use-planer'
import {useUpdatePlace} from '../hooks/use-update-place'

export const Places = () => {
  const {selectPlace, places} = usePlaner()
  const updatePlace = useUpdatePlace()
  return (
    <VirtualList
      data={places}
      sorted={(item, order) => {
        updatePlace({...item, order})
      }}
      itemRender={({item}) => (
        <PlaceCard
          place={item}
          key={item.id}
          onClick={() => selectPlace(item)}
        />
      )}
    />
  )
}

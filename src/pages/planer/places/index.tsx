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
      idPredicate={item => item.uid}
      orderPredicate={item => item.order}
      sorted={(item, order) => {
        updatePlace({...item, order})
      }}
      itemRender={({item}) => (
        <PlaceCard
          place={item}
          key={item.uid}
          onClick={() => selectPlace(item)}
        />
      )}
    />
  )
}

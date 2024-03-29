import {ListRowProps, VirtualList} from 'common/components/virtual-list'
import {PlaceCard} from '../common/place-card'
import {usePlaner} from '../hooks/use-planer'
import {useUpdatePlace} from '../hooks/use-update-place'
import {ReactComponent as DestinationIlistration} from 'assets/img/destinations.svg'
import {Search} from '../common/search'
import {Place} from 'common/types/place'

export const Places = () => {
  const {selectPlace, places} = usePlaner()
  const updatePlace = useUpdatePlace()
  return (
    <div className="space-y-4 max-h-full">
      <Search />

      {places.length ? (
        <VirtualList
          data={places}
          idPredicate={item => item.uid}
          orderPredicate={item => item.order}
          sorted={(item, order) => {
            updatePlace({...item, order})
          }}
          itemRender={(props: ListRowProps<Place>) => (
            <PlaceCard
              {...props}
              key={props.item.uid}
              onClick={() => selectPlace(props.item)}
              mark={String.fromCharCode(65 + props.index)}
            />
          )}
        />
      ) : (
        <div className="mt-10">
          <DestinationIlistration
            style={{
              filter: `grayscale(1)`,
              height: 'fit-content',
            }}
            className="my-12 w-60 md:w-96 mx-auto mix-blend-soft-light object-scale-down"
          />
          <p className="text-center font-bold text-gray-400 text-xl">
            Add an place to go.
          </p>
        </div>
      )}
    </div>
  )
}

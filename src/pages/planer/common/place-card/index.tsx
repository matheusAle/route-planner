import React from 'react'
import {Place} from 'common/types/place'
import {useDeletePlace} from '../../hooks/use-delete-place'
import {useUpdatePlace} from '../../hooks/use-update-place'
import {cn} from 'common/utils/classnames'
import {ListRowProps} from 'common/components/virtual-list'
import {MdDragIndicator} from 'react-icons/md'
import {IoMdAddCircle, IoMdRemoveCircle, IoMdTrash} from 'react-icons/io'
interface PlaceCardProps extends ListRowProps<Place> {
  mark: string
  onClick(): void
}

export const PlaceCard = ({
  item: place,
  onClick,
  mark,
  dragHandleProps,
}: PlaceCardProps) => {
  const deletePlace = useDeletePlace()
  const updatePlace = useUpdatePlace()

  const removeHandle = () => deletePlace(place)

  const toggleRoute = () => {
    updatePlace({
      ...place,
      route: !place.route,
    })
  }

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg w-full max-w-full px-2 py-3 flex items-center space-x-2"
    >
      <div {...dragHandleProps}>
        <MdDragIndicator className="text-base w-4" />
      </div>
      <div className="max-w-full overflow-hidden space-y-2">
        <div className="flex-grow flex flex-row space-x-3">
          <div
            onClick={toggleRoute}
            className={cn(
              'rounded-full cursor-pointer flex-shrink-0 w-10 h-10 flex items-center justify-center',
              place.route ? 'bg-blue-600' : 'bg-gray-600',
            )}
          >
            <div>{mark}</div>
          </div>
          <div className="overflow-hidden max-w-full">
            <h4 className="font-medium">{place.name}</h4>
            <p className="text-xs text-gray-500 whitespace-nowrap overflow-ellipsis overflow-hidden">
              {place.address}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={toggleRoute}
            className="flex items-center p-1 space-x-1 rounded-sm hover:bg-gray-700 transition-all bg-opacity-3"
          >
            {place.route ? <IoMdRemoveCircle /> : <IoMdAddCircle />}
            <span className="text-3xs uppercase">
              {place.route ? 'remove from path' : 'Add to path'}
            </span>
          </button>
          {/* <button className="flex items-center p-1 space-x-1 rounded-sm hover:bg-gray-700 transition-all bg-opacity-3">
            <IoMdMap />
            <span className="text-3xs uppercase">Open map</span>
          </button> */}
          <button
            onClick={removeHandle}
            className="flex items-center p-1 space-x-1 rounded-sm hover:bg-gray-700 transition-all bg-opacity-3"
          >
            <IoMdTrash />
            <span className="text-3xs uppercase">Remove</span>
          </button>
        </div>
      </div>
    </div>
  )
}

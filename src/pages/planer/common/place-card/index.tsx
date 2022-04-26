import React from 'react'
import {Place} from 'common/types/place'
import {FaTrash} from 'react-icons/fa'
import {useDeletePlace} from '../../hooks/use-delete-place'

interface PlaceCardProps {
  place: Place
  mark: string
  onClick(): void
}

export const PlaceCard = ({place, onClick, mark}: PlaceCardProps) => {
  const deletePlace = useDeletePlace()

  const removeHandle = () => deletePlace(place)

  return (
    <div onClick={onClick} className="card bordered compact bg-base-200 w-full">
      <div className="card-body flex items-center flex-row">
        <div className="flex-grow flex flex-row space-x-3">
          <div className="rounded-full bg-gray-600 flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <div>{mark}</div>
          </div>
          <div>
            <h4 className="card-title">{place.name}</h4>
            <p className="font-normal text-sm text-gray-500">{place.address}</p>
          </div>
        </div>
        <button
          className="btn btn-xs btn-ghost hover:btn-outline btn-circle"
          onClick={removeHandle}
        >
          <FaTrash className="opacity-50" />
        </button>
      </div>
    </div>
  )
}

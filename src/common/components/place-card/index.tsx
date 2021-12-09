import React from "react";
import { Place } from "@/common/api/types/place";
import { usePlacesMutation } from "@/common/hooks/use-places-mutation";
import {FaTrash} from 'react-icons/fa'

interface PlaceCardProps {
    place: Place;
    onClick(): void
}

export const PlaceCard = ({place, onClick}: PlaceCardProps) => {
    const { removePlace } = usePlacesMutation();

    return (
        <div
          onClick={onClick}
          className="border border-solid border-gray-200 rounded-md p-4 bg-white w-full h-full flex items-center"
        >
          <div className="flex-grow">
            <p className="font-medium text-sm">{place.name}</p>
            <p className="font-normal text-sm text-gray-500">
                {place.address}
            </p>
          </div>
          <button 
            onClick={() => removePlace(place)}
            className="p-2 rounded-md outline-none hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
            >
            <FaTrash size=".9rem"/>
          </button>
        </div>
      );
}
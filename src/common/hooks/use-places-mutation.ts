import { Places, useAppDispatch } from "@/store"
import { Place } from "../api/types/place";
import * as API from '../api/places';


export const usePlacesMutation = () => {

    const dispatch = useAppDispatch();


    const removePlace = (place: Place) => {
        dispatch(Places.remove(place.id));
        API.removePlace(place)
    }

    const updatePlace = (place: Place) => {
        dispatch(Places.update({
            changes: place,
            id: place.id
        }));
        API.updatePlace(place)
    }

    return {
        removePlace,
        updatePlace,
    }

}
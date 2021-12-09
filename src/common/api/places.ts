import { requestWraper } from "./common";
import { Place } from './types/place';


export const fetchPlaces = () => requestWraper<Place[]>({
    method: 'get',
    url: '/places'
})

export const addPlace = (place: Place) => requestWraper<Place>({
    method: 'post',
    url: `/places`,
    data: place
})

export const removePlace = (place: Place) => requestWraper({
    method: 'delete',
    url: `/places/${place.id}`
})

export const updatePlace = (place: Place) => requestWraper<Place>({
    method: 'patch',
    url: `/places/${place.id}`,
    data: place
})


import { useCallback, useMemo, useState } from "react";
import { Place } from "../../api/types/place";



export const useDirections = (places: Place[]) => {

    const [directions, setDirections] = useState<google.maps.DirectionsResult>()


    const directionsRequest = useMemo<google.maps.DirectionsRequest>(() => {
        
        const [origin] = places;

        return {
            origin: { placeId: origin.id },
            destination: { placeId: places[places.length- 1].id },
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: places.slice(1, -1).map(place => ({
                location: { placeId: place.id },
                stopover: true
            }))
        }
    }, [places])


    const requestCallback = useCallback((result: google.maps.DirectionsResult | null, 
        status: google.maps.DirectionsStatus) => {
            console.log({result, status})
            if (status !== google.maps.DirectionsStatus.OK || ! result) {
                return;
            }
            setDirections(result)
    }, [])

    return {
        directionsRequest,
        directions,
        setDirections: requestCallback
    }
}
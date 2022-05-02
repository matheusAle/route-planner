import {useCallback} from 'react'
import {useDeepCompareMemo} from 'use-deep-compare'
import {usePlaner} from '../hooks/use-planer'

export const useDirections = () => {
  const {placesInRoute, setDirections} = usePlaner()

  const directionsRequest = useDeepCompareMemo<
    google.maps.DirectionsRequest | undefined
  >(() => {
    if (!placesInRoute.length) return
    const [origin] = placesInRoute

    return {
      origin: {placeId: origin.place_id},
      destination: {placeId: placesInRoute[placesInRoute.length - 1].place_id},
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: placesInRoute.slice(1, -1).map(placesInRoute => ({
        location: {placeId: placesInRoute.place_id},
        stopover: true,
      })),
    }
  }, [placesInRoute])

  const directionsRequestCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus,
    ) => {
      if (status !== google.maps.DirectionsStatus.OK || !result) {
        return
      }
      setDirections(result)
    },
    [setDirections],
  )

  return {
    directionsRequest,
    directionsRequestCallback,
  }
}

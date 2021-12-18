import {useCallback, useMemo, useState} from 'react'
import {usePlaner} from '../hooks/use-planer'

export const useDirections = () => {
  const {places, setDirections} = usePlaner()

  const directionsRequest = useMemo<
    google.maps.DirectionsRequest | undefined
  >(() => {
    if (!places.length) return
    const [origin] = places

    return {
      origin: {placeId: origin.place_id},
      destination: {placeId: places[places.length - 1].place_id},
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: places.slice(1, -1).map(place => ({
        location: {placeId: place.place_id},
        stopover: true,
      })),
    }
  }, [places])

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
    [],
  )

  return {
    directionsRequest,
    directionsRequestCallback,
  }
}

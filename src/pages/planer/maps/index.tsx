import React from 'react'
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api'
import {useDirections} from './use-directions'
import {usePlaner} from '../hooks/use-planer'

const containerStyle = {
  width: '100%',
  height: '100%',
}

export const Maps = () => {
  const {selectedPlace, directions} = usePlaner()
  const [, setMap] = React.useState<google.maps.Map | null>(null)
  const {directionsRequest, directionsRequestCallback} = useDirections()

  const onLoad = React.useCallback(mapLoad => {
    const bounds = new window.google.maps.LatLngBounds()
    mapLoad.fitBounds(bounds)
    setMap(mapLoad)
  }, [])

  const onUnmount = React.useCallback(() => {
    setMap(null)
  }, [])

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedPlace?.geo}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerClassName="h-full w-full"
    >
      {directionsRequest && (
        <DirectionsService
          options={directionsRequest}
          callback={directionsRequestCallback}
        />
      )}
      {directions && (
        <DirectionsRenderer
          options={{
            directions,
          }}
        />
      )}
      <></>
    </GoogleMap>
  )
}

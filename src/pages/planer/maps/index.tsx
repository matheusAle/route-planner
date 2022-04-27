import React, {useCallback, useEffect, useState} from 'react'
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api'
import {useDirections} from './use-directions'
import {usePlaner} from '../hooks/use-planer'
import {Place} from 'common/types/place'

const containerStyle = {
  width: '100%',
  height: '100%',
}

export const Maps = () => {
  const {selectedPlace, directions} = usePlaner()

  const {directionsRequest, directionsRequestCallback} = useDirections()
  const [bounds, setBounds] = useState(() =>
    new window.google.maps.LatLngBounds().toJSON(),
  )

  const [map, setMap] = useState<google.maps.Map>()
  const onLoad = React.useCallback((mapLoad: google.maps.Map) => {
    // mapLoad.fitBounds(bounds)

    // mapLoad.addListener('bounds_changed', () => {
    //   setBounds(mapLoad.getBounds() as any)
    //   console.log(mapLoad.getBounds())
    // })
    // mapLoad.addListener('zoom_changed', () => {
    //   setZoom(mapLoad.getZoom())
    // })
    setMap(mapLoad)
  }, [])

  const onBoundsChanged = useCallback(() => {
    const b = map?.getBounds()
    if (b) setBounds(b.toJSON)
  }, [])

  useEffect(() => {
    if (map && selectedPlace) {
      const b = new window.google.maps.LatLngBounds()

      map.fitBounds(b.extend(selectedPlace?.geo))
    }
  }, [selectedPlace?.geo.lat, map])

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      mapContainerClassName="h-full w-full"
      onBoundsChanged={onBoundsChanged}
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

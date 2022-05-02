import React, {useCallback, useEffect, useState} from 'react'
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  Marker,
} from '@react-google-maps/api'
import {useDirections} from './use-directions'
import {usePlaner} from '../hooks/use-planer'
import {cn} from 'common/utils/classnames'

const containerStyle = {
  width: '100%',
  height: '100%',
}

export const Maps = () => {
  const {selectedPlace, directions, places} = usePlaner()

  const {directionsRequest, directionsRequestCallback} = useDirections()
  const [bounds, setBounds] = useState()
  // new window.google.maps.LatLngBounds().toJSON(),

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
    // const b = map?.getBounds()
    // if (b) setBounds(b.toJSON)
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
      mapContainerClassName="h-full w-full "
      onBoundsChanged={onBoundsChanged}
    >
      {places.map((place, index) => (
        <Marker
          position={place.geo}
          key={place.place_id}
          label={{
            text: String.fromCharCode(65 + index),
            className: cn(
              'font-semibold',
              place.route ? ' text-white' : ' text-gray-500 opacity-80',
            ),
            color: 'currentColor',
          }}
          zIndex={99}
        />
      ))}
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
            suppressMarkers: true,
          }}
        />
      )}

      <></>
    </GoogleMap>
  )
}

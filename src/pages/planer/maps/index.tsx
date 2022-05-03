import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import {usePlaner} from '../hooks/use-planer'
import {cn} from 'common/utils/classnames'
import {Directions} from './directions'

const CENTER_FLORIPA: google.maps.LatLngLiteral = {
  lat: -27.6017105,
  lng: -48.5957942,
}

export const Maps = () => {
  const {selectedPlace, places} = usePlaner()

  const [center, setCenter] = useState<google.maps.LatLngLiteral>(
    places[0]?.geo || CENTER_FLORIPA,
  )

  const [, setMap] = useState<google.maps.Map>()

  const onLoad = useCallback((mapLoad: google.maps.Map) => {
    mapLoad.setZoom(10)
    setMap(mapLoad)
  }, [])

  useEffect(() => {
    if (selectedPlace) setCenter(selectedPlace.geo)
    else setCenter(CENTER_FLORIPA)

    // change center only if the selected place change
    // it avoid any other change into selected place object, eg. order or route
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace?.geo])

  return (
    <GoogleMap
      onLoad={onLoad}
      mapContainerClassName="h-full w-full"
      center={center}
    >
      {places.map((place, index) => (
        <Marker
          position={place.geo}
          key={place.uid}
          label={{
            text: String.fromCharCode(65 + index),
            className: cn(
              'font-semibold',
              place.route ? ' text-white' : ' text-gray-500 opacity-80',
            ),
            color: 'currentColor',
          }}
        />
      ))}
      <Directions />
      <></>
    </GoogleMap>
  )
}

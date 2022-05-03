import {DirectionsRenderer, DirectionsService} from '@react-google-maps/api'
import {useState} from 'react'
import {usePlaner} from '../hooks/use-planer'
import {useDirections} from './use-directions'

export const Directions = () => {
  const [preserveViewport, setPreserveViewport] = useState(false)

  const {directions} = usePlaner()
  const {directionsRequest, directionsRequestCallback} = useDirections()

  return (
    <>
      {directionsRequest && (
        <DirectionsService
          options={directionsRequest}
          callback={directionsRequestCallback}
        />
      )}
      {directions && (
        <DirectionsRenderer
          onLoad={() => setTimeout(() => setPreserveViewport(true), 1000)}
          options={{
            directions,
            preserveViewport,
            suppressMarkers: true,
          }}
        />
      )}
    </>
  )
}

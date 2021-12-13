import {useJsApiLoader} from '@react-google-maps/api'

const libraries: any[] = ['places']

export const useMaps = () => {
  return useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
    libraries,
  })
}

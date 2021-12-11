import {useJsApiLoader} from '@react-google-maps/api'

const libraries: any[] = ['places']

export const useMaps = () => {
  return useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDCcslkcL69SV9xpuKUtWAt-EZ-9Gur0wQ',
    libraries,
  })
}

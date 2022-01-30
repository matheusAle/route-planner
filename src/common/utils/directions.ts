import {Place} from 'common/types/place'

interface GenerateTestDirectionsResultOptions {
  distanceMeters: number
  durationMinutes: number
}

export const generateTestDirectionsLeg = (
  start: Place,
  end: Place,
  {durationMinutes, distanceMeters}: GenerateTestDirectionsResultOptions,
): google.maps.DirectionsLeg => {
  return {
    end_address: end.address,
    end_location: end.geo as any,
    start_address: start.address,
    start_location: start.geo as any,
    via_waypoints: [],
    traffic_speed_entry: [],
    steps: [],
    distance: {
      text: '10 km',
      value: distanceMeters,
    },
    duration: {
      text: '1 hour',
      value: durationMinutes,
    },
  }
}

export const generateTestDirectionsResult = (
  places: Place[],
  options: GenerateTestDirectionsResultOptions,
): google.maps.DirectionsResult => {
  if (places.length < 2)
    throw new Error('generateTestDirections: require 2 or more places')
  return {
    routes: [
      {
        bounds: {} as any,
        copyrights: '',
        overview_polyline: {} as any,
        overview_path: [],
        summary: '',
        warnings: [],
        waypoint_order: [],
        legs: places.slice(0, -1).map((place, index) => {
          return generateTestDirectionsLeg(place, places[index + 1], options)
        }),
      },
    ],
  }
}

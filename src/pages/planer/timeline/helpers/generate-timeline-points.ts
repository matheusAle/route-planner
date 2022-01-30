import {Place} from 'common/types/place'
import {Point} from '../types'

export const parseLegToTimelinePoint = (
  leg: google.maps.DirectionsLeg,
  at: number,
): Point => ({
  type: 'move',
  at,
  leg,
})

export const parsePlaceToTimelinePoint = (place: Place, at: number): Point => {
  return {
    type: 'stop',
    at,
    place,
  }
}

interface generateTimelinePointsParam {
  places: Place[]
  directions: google.maps.DirectionsResult
  domainMin: number
}

export const generateTimelinePoints = ({
  places,
  directions,
  domainMin,
}: generateTimelinePointsParam) => {
  const valuesToSet: Point[] = []
  let atAcc = domainMin
  const [{legs}] = directions.routes

  legs.forEach((leg, index) => {
    const place = places[index]
    const placeToPush = parsePlaceToTimelinePoint(place, atAcc)

    if (index !== 0) atAcc += place.stayTime
    else placeToPush.isEdge = true

    valuesToSet.push(placeToPush)

    const moveTime = parseLegToTimelinePoint(leg, atAcc)
    valuesToSet.push(moveTime)
    atAcc += (leg?.duration?.value || 0) * 1000

    if (index === legs.length - 1 && places[index + 1]) {
      const lastPlace = parsePlaceToTimelinePoint(places[index + 1], atAcc)
      lastPlace.isEdge = true
      valuesToSet.push(lastPlace, {
        at: atAcc,
        type: 'move',
      })
    }
  })

  return valuesToSet
}

import {Place} from 'common/types/place'
import {Travel} from 'common/types/travel'
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
  travel: Travel
}

export const generateTimelinePoints = ({
  places,
  directions,
  domainMin,
  travel,
}: generateTimelinePointsParam) => {
  const valuesToSet: Point[] = [
    // {
    //   type: 'move',
    //   at: domainMin,
    // },
    // {
    //   type: 'stop',
    //   at: domainMin + (travel.arriveAt || 0),
    //   place: {name: 'Arrive'} as any,
    // },
    // {
    //   type: 'move',
    //   isArrive: true,
    //   at:  + 1000 +,
    // },
  ]
  let atAcc = domainMin + (travel.arriveAt || 0)
  const [{legs}] = directions.routes

  legs.forEach((leg, index) => {
    const place = places[index]
    const placeToPush = parsePlaceToTimelinePoint(place, atAcc)

    // if (index !== 0)

    atAcc += place.stayTime
    // else placeToPush.isEdge = true

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

import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useMemo} from 'react'
import {parseLegToTimelinePoint, parsePlaceToTimelinePoint} from '../helpers'
import {TimelinePoint} from '../types'
import {useDomain} from './use-domain'

export const usePoints = () => {
  const [domainMin, domainMax] = useDomain()
  const {places, directions} = usePlaner()

  const points = useMemo(() => {
    // do NOT execute if directions data is not loaded
    if (!places.length || !directions?.routes?.length) return []

    // set handles
    const valuesToSet: Array<TimelinePoint> = []
    let atAcc = domainMin
    const stopTime = 1000 * 60 * 60 * 2
    const [{legs}] = directions.routes

    legs.forEach((leg, index) => {
      const place = places[index]
      const placeToPush = parsePlaceToTimelinePoint(place, atAcc, stopTime)

      if (index !== 0) atAcc += stopTime
      else placeToPush.isEdge = true

      valuesToSet.push(placeToPush)

      const moveTime = parseLegToTimelinePoint(atAcc, leg)
      valuesToSet.push(moveTime)
      atAcc += (leg?.duration?.value || 0) * 1000

      if (index === legs.length - 1) {
        const lastPlace = parsePlaceToTimelinePoint(
          places[index + 1],
          atAcc,
          stopTime,
        )
        lastPlace.isEdge = true
        valuesToSet.push(lastPlace, {
          name: '',
          at: atAcc + 1,
          type: 'move',
          isEdge: true,
          duration: 0,
        })
      }
    })

    return valuesToSet
  }, [directions, places, domainMin])

  return {
    points,
    domainMax,
    domainMin,
  }
}

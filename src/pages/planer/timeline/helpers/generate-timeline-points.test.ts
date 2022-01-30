import {generateTestDirectionsResult} from 'common/utils/directions'
import {generateTestPlace} from 'common/utils/place'
import {Point, TimelinePoint} from '../types'
import {generateTimelinePoints} from './generate-timeline-points'

describe('generateTimelinePoints', () => {
  const distanceMeters = 1000
  const durationMinutes = 1
  const durationMilliseconds = durationMinutes * 1000
  const domainMin = 0 // 1000 * 60 * 60 * 24 // 1d
  const stayTime = 1

  const places = [
    generateTestPlace({stayTime}),
    generateTestPlace({stayTime}),
    generateTestPlace({stayTime}),
    generateTestPlace({stayTime}),
    generateTestPlace({stayTime}),
  ]

  const directions = generateTestDirectionsResult(places, {
    distanceMeters,
    durationMinutes,
  })

  it('should generate points correctly', () => {
    const firstPlacePoints: Point[] = [
      {
        type: 'stop',
        at: domainMin,
        place: places[0],
        isEdge: true,
      },
      {
        type: 'move',
        at: domainMin,
        leg: directions.routes[0].legs[0],
      },
    ]

    const secondPlacePoints: Point[] = [
      {
        type: 'stop',
        place: places[1],
        at: firstPlacePoints[0].at + durationMilliseconds,
      },
      {
        type: 'move',
        at: firstPlacePoints[0].at + stayTime + durationMilliseconds,
        leg: directions.routes[0].legs[1],
      },
    ]

    const thirdPlacePoints: Point[] = [
      {
        type: 'stop',
        place: places[2],
        at: secondPlacePoints[0].at + stayTime + durationMilliseconds,
      },
      {
        type: 'move',
        at: secondPlacePoints[1].at + stayTime + durationMilliseconds,
        leg: directions.routes[0].legs[2],
      },
    ]

    const fourthPlacePoints: Point[] = [
      {
        type: 'stop',
        place: places[3],
        at: thirdPlacePoints[0].at + stayTime + durationMilliseconds,
      },
      {
        type: 'move',
        at: thirdPlacePoints[1].at + stayTime + durationMilliseconds,
        leg: directions.routes[0].legs[3],
      },
    ]

    const fifthPlacePoints: Point[] = [
      {
        type: 'stop',
        place: places[4],
        at: fourthPlacePoints[0].at + stayTime + durationMilliseconds,
        isEdge: true,
      },
      {
        type: 'move',
        at: fourthPlacePoints[0].at + stayTime + durationMilliseconds,
      },
    ]

    const expectedPoints: Point[] = [
      ...firstPlacePoints,
      ...secondPlacePoints,
      ...thirdPlacePoints,
      ...fourthPlacePoints,
      ...fifthPlacePoints,
    ]

    const r = generateTimelinePoints({
      places,
      directions,
      domainMin,
    })

    expect(r).toEqual(expectedPoints)
  })
})

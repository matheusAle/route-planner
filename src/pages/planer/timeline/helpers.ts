import {Place} from '@/common/types/place'
import {timelinePoint} from './types'

export const isHandleDisabled = (index: number, length: number): boolean => {
  return index === 0 || index % 2 === 1 || index + 1 === length
}

export const parseLegToTimelinePoint = (
  at: number,
  leg: google.maps.DirectionsLeg,
): timelinePoint => ({
  type: 'stop',
  name: '',
  at,
  distance: leg?.distance?.text || '',
  duration: leg?.duration?.value || 0,
})

export const parsePlaceToTimelinePoint = (
  place: Place,
  at: number,
  stopTime: number,
): timelinePoint => {
  return {
    type: 'move',
    name: place.name,
    at,
    distance: '',
    duration: stopTime,
  }
}

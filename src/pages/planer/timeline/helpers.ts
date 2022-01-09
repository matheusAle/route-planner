import {Place} from 'common/types/place'
import {TimelinePoint} from './types'

export const isHandleDisabled = (
  points: TimelinePoint[],
  index: number,
): boolean => {
  if (index < 2 || index === points.length) return true
  const point = points[index]
  if (point.type === 'stop') return true

  return false
}

export const parseLegToTimelinePoint = (
  at: number,
  leg: google.maps.DirectionsLeg,
): TimelinePoint => ({
  type: 'move',
  name: '',
  at,
  distance: leg?.distance?.text || '',
  duration: leg?.duration?.value || 0,
})

export const parsePlaceToTimelinePoint = (
  place: Place,
  at: number,
  stopTime: number,
): TimelinePoint => {
  return {
    type: 'stop',
    name: place.name,
    at,
    distance: '',
    duration: stopTime,
  }
}

export const onSliderChange = (
  values: TimelinePoint[],
  newValues: readonly number[],
): TimelinePoint[] => {
  // check which handler was changed
  const valuesToSet = [...values]
  valuesToSet.forEach((value, index) => {
    const formValue = newValues[index]
    if (value.type === 'stop' && value.at !== formValue) {
      const diff = formValue - value.at
      if (diff != 1 && diff != -1) {
        if (valuesToSet[index - 1]?.duration) {
          valuesToSet[index - 1].duration += diff
        }
      }
    }
  })

  // reset "at" for each handler based on "duration" attributes
  let atAcc = 0
  valuesToSet.forEach(value => {
    value.at = atAcc
    atAcc += value.duration
  })

  return valuesToSet
}

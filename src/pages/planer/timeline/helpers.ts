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

export const onSliderChange = (
  values: timelinePoint[],
  newValues: readonly number[],
): timelinePoint[] => {
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

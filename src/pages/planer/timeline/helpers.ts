import {timelinePoint} from './types'

export const isHandleDisabled = (index: number, length: number): boolean => {
  return index === 0 || index % 2 === 1 || index + 1 === length
}

export const timelinePointStopFactory = (
  at: number,
  leg: google.maps.DirectionsLeg,
): timelinePoint => ({
  type: 'stop',
  name: '',
  at,
  distance: leg?.distance?.text || '',
  duration: leg?.duration?.value || 0,
})

export const timelinePointMoveFactory = (
  name: string,
  at: number,
  duration: number,
): timelinePoint => ({
  type: 'move',
  name,
  at,
  distance: '',
  duration,
})

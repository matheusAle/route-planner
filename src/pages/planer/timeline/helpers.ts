import {TimelinePoint} from './types'

export const isHandleDisabled = (
  points: TimelinePoint[],
  index: number,
): boolean => {
  if (index === points.length) return true
  const point = points[index]
  if (index !== 0 && point.type === 'stop') return true

  return false
}

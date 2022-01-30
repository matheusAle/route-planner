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

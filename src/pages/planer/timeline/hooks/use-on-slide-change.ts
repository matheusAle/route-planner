import {useUpdatePlace} from 'pages/planer/hooks/use-update-place'
import {SliderProps} from 'react-compound-slider'
import {Point} from '../types'

export const useOnSliderChange = (
  points: Point[],
): SliderProps['onSlideEnd'] => {
  const updatePlaces = useUpdatePlace()

  return (newValues: readonly number[], {activeHandleID}) => {
    const index = parseInt(activeHandleID.replace('$$-', ''))
    const point = points[index - 1]

    if (point.type === 'stop') {
      const diff = newValues[index] - points[index].at

      updatePlaces({
        ...point.place,
        stayTime: point.place.stayTime + diff,
      })
    }
  }
}

import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useUpdatePlace} from 'pages/planer/hooks/use-update-place'
import {useUpdateTravel} from 'pages/planer/hooks/use-update-travel'
import {SliderProps} from 'react-compound-slider'
import {useTimelimeContext} from '../context'
import {Point} from '../types'

export const useOnSliderChange = (
  points: Point[],
): SliderProps['onSlideEnd'] => {
  const {travel} = usePlaner()
  const {
    domain: [domainMin],
  } = useTimelimeContext()
  const updatePlaces = useUpdatePlace()
  const updateTravel = useUpdateTravel()

  return (newValues: readonly number[], {activeHandleID}) => {
    const index = parseInt(activeHandleID.replace('$$-', ''))

    if (index === 0) {
      updateTravel({...travel, arriveAt: newValues[index] - domainMin})
      return
    }

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

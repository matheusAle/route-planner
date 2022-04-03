import {format} from 'date-fns'
import {useMemo} from 'react'
import {SliderItem} from 'react-compound-slider'
import {useTimelineContext} from '../context'

export interface TickProps {
  tick: SliderItem
  nextTick: SliderItem
  count: number
}

export const Tick = ({tick, count, nextTick}: TickProps) => {
  const {direction, height, width} = useTimelineContext()
  const text = useMemo(() => {
    const formatHour = 'HH:mm'
    const current = new Date(tick.value)

    if (!nextTick) return format(current, formatHour)

    const next = new Date(nextTick.value)

    if (current.getDay() !== next.getDay()) return format(next, 'dd/MMM')

    return format(current, formatHour)
  }, [tick.value, nextTick])

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'rgb(200,200,200)',
        ...(direction === 'vertical'
          ? {
              height: 1,
              width: 5,
              top: `${tick.percent}%`,
            }
          : {
              width: 1,
              height: 5,
              left: `${tick.percent}%`,
              marginTop: height,
            }),
      }}
    >
      <span className="inline-block text-2xs transform -translate-x-1/2">
        {text}
      </span>
    </div>
  )
}

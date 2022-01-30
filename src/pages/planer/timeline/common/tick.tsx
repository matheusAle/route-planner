import {format} from 'date-fns'
import {useMemo} from 'react'
import {SliderItem} from 'react-compound-slider'

export interface TickProps {
  tick: SliderItem
  nextTick: SliderItem
  count: number
}

export const Tick = ({tick, count, nextTick}: TickProps) => {
  const text = useMemo(() => {
    const formatHour = 'HH:mm'
    const current = new Date(tick.value)

    if (!nextTick) return format(current, formatHour)

    const next = new Date(nextTick.value)

    if (current.getDay() !== next.getDay()) return format(next, 'dd/MMM')

    return format(current, formatHour)
  }, [tick.value, nextTick])

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 32,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 38,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {text}
      </div>
    </div>
  )
}

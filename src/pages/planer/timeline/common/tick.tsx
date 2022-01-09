import {format} from 'date-fns'
import {useMemo} from 'react'
import {SliderItem} from 'react-compound-slider'

export interface TickProps {
  tick: SliderItem
  count: number
}

export const Tick = ({tick, count}: TickProps) => {
  const text = useMemo(() => {
    return format(new Date(tick.value), 'dd HH:mm')
  }, [tick.value])

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

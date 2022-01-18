import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'

import {isHandleDisabled} from './helpers'
import {Track} from './common/track'
import {SliderRail} from './common/slider-rail'
import {Handle} from './common/handle'
import {Tick} from './common/tick'
import {usePoints} from './hooks/use-points'
import {sliderCustomHandle} from './helpers/slider-custom-mode'
import {useCallback, useEffect, useState} from 'react'
import {cn} from 'common/utils/classnames'

const sliderStyle = {
  position: 'relative',
  zIndex: 0,
  width: '100%',
}

const zoomValues = [
  {label: '1h', value: 60},
  {label: '2h', value: 60 * 2},
  {label: '4h', value: 60 * 4},
]

export const Timeline = () => {
  const {points, domainMax, domainMin} = usePoints()

  const [zoom, setZoom] = useState(60)
  const [count, setCount] = useState(15)

  const onChange = useCallback(
    (val: number) => {
      const n = 1000 * 60 * val
      setZoom(val)
      const time = domainMax - domainMin
      setCount(Math.floor(time / n))
    },
    [setZoom, setCount, domainMax, domainMin],
  )

  useEffect(() => {
    onChange(zoomValues[0].value)
  }, [onChange])

  if (!points.length) return <></>

  return (
    <div className="overflow-auto h-full flex flex-col px-6">
      <div className="btn-group">
        <label htmlFor="" className="mr-3">
          zoom:{' '}
        </label>
        {zoomValues.map(({label, value}) => (
          <button
            key={value}
            className={cn('btn btn-xs', {'btn-active': zoom === value})}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="flex items-center h-full"
        style={{width: `${count * 92}px`}}
      >
        <Slider
          mode={sliderCustomHandle}
          step={1000 * 60 * 15}
          domain={[domainMin, domainMax]}
          rootStyle={{...sliderStyle}}
          values={points.map(h => h.at)}
        >
          <Rail>
            {({getRailProps}) => <SliderRail getRailProps={getRailProps} />}
          </Rail>

          <Handles>
            {({handles, getHandleProps}) => (
              <div className="slider-handles">
                {handles.map((handle, index) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[domainMin, domainMax]}
                    getHandleProps={getHandleProps}
                    disabled={isHandleDisabled(points, index)}
                  />
                ))}
              </div>
            )}
          </Handles>

          <Tracks left={false} right={false}>
            {({tracks, getTrackProps}) => (
              <div className="slider-tracks">
                {tracks.map((track, index) => (
                  <Track
                    key={track.id}
                    getTrackProps={getTrackProps}
                    trackItem={track}
                    point={points[index]}
                  />
                ))}
              </div>
            )}
          </Tracks>

          <Ticks count={count * 2}>
            {({ticks}) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    </div>
  )
}

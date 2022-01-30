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
import {scaleTime} from 'd3-scale'

const sliderStyle = {
  position: 'relative',
  zIndex: 0,
  width: '100%',
}

const zoomValues = [
  {label: '1h', value: 24},
  {label: '2h', value: 12},
  {label: '4h', value: 4},
]

export const Timeline = () => {
  const {points, domainMax, domainMin} = usePoints()

  const [zoom, setZoom] = useState(60)
  const [dateTicks, setDateTicks] = useState<number[]>([])

  const onChange = useCallback(
    (val: number) => {
      setDateTicks(
        scaleTime()
          .domain([domainMin, domainMax])
          .ticks(3 * val)
          .map((d: any) => +d),
      )
      setZoom(val)
    },
    [setZoom, domainMax, domainMin],
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
        className="flex items-center h-full min-w-full"
        style={{width: `${dateTicks.length * 62}px`}}
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

          <Ticks values={dateTicks}>
            {({ticks}) => (
              <div className="slider-ticks">
                {ticks.map((tick, index) => (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    nextTick={ticks[index + 1]}
                    count={ticks.length}
                  />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    </div>
  )
}

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
import {useOnSliderChange} from './hooks/use-on-slide-change'
import {TimelineContextProvider} from './context'

const sliderStyle = {
  position: 'relative',
  zIndex: 0,
  touchAction: 'none',
}

const zoomValues = [
  {label: '15mim', value: 92},
  {label: '30mim', value: 48},
  {label: '1h', value: 24},
  {label: '2h', value: 12},
  {label: '4h', value: 4},
]

interface TimelineProps {
  vertical?: boolean
}

export const Timeline = ({vertical}: TimelineProps) => {
  const {points, domainMax, domainMin, values} = usePoints()
  const onSliderChange = useOnSliderChange(points)
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
    onChange(zoomValues[1].value)
  }, [onChange])

  if (!points.length) return <></>

  return (
    <TimelineContextProvider
      direction={vertical ? 'vertical' : 'horizontal'}
      {...(vertical
        ? {height: `${dateTicks.length * 200}px`, width: '62px'}
        : {width: `${dateTicks.length * 62}px`, height: '62px'})}
    >
      <div
        className={cn('overflow-auto flex flex-col px-6', {
          'h-full': !vertical,
        })}
      >
        <div className="btn-group mb-5">
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
          className="flex items-center"
          style={
            vertical
              ? {height: `${dateTicks.length * 200}px`}
              : {width: `${dateTicks.length * 62}px`}
          }
        >
          <Slider
            mode={sliderCustomHandle}
            step={1000 * 60 * 15}
            domain={[domainMin, domainMax]}
            rootStyle={{
              ...sliderStyle,
              ...(vertical ? {height: `100%`} : {width: `100%`}),
            }}
            values={values}
            onSlideEnd={onSliderChange}
            vertical={vertical}
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
                <div className="slider-tracks ">
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
    </TimelineContextProvider>
  )
}

import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'

import {isHandleDisabled} from './helpers'
import {Track} from './common/track'
import {SliderRail} from './common/slider-rail'
import {Handle} from './common/handle'
import {Tick} from './common/tick'
import {sliderCustomHandle} from './helpers/slider-custom-mode'
import {useOnSliderChange} from './hooks/use-on-slide-change'
import {TimelineContextProvider, useTimelimeContext} from './context'
import {ScaleTicks} from './common/scale-ticks'

const sliderStyle = {
  position: 'relative',
  zIndex: 0,
  width: '100%',
}

const TimelineInner = () => {
  const {
    points,
    pointsValues,
    domain: [domainMin, domainMax],
    scale: {ticks},
  } = useTimelimeContext()
  const onSliderChange = useOnSliderChange(points)

  if (!domainMax || !domainMin)
    return (
      <div className="flex items-center justify-center h-full flex-col">
        <div className="alert alert-warning">
          Set the travel date to see the timeline
        </div>
      </div>
    )

  if (!points.length)
    return (
      <div className="flex items-center justify-center h-full flex-col">
        <div className="alert alert-warning">
          add places to path to see the timeline
        </div>
      </div>
    )

  return (
    <div className="overflow-auto h-full flex flex-col px-6">
      <ScaleTicks />
      <div
        className="flex items-center h-full min-w-full"
        style={{width: `${ticks.length * 62}px`}}
      >
        <Slider
          mode={sliderCustomHandle}
          step={1000 * 60 * 15}
          domain={[domainMin, domainMax]}
          rootStyle={sliderStyle}
          values={pointsValues}
          onSlideEnd={onSliderChange}
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
                    isFirst={index === 0}
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

          <Ticks values={ticks}>
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

export const Timeline = () => (
  <TimelineContextProvider>
    <TimelineInner />
  </TimelineContextProvider>
)

import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'

import {isHandleDisabled} from './helpers'
import {Track} from './common/track'
import {SliderRail} from './common/slider-rail'
import {Handle} from './common/handle'
import {Tick} from './common/tick'
import {usePoints} from './hooks/use-points'
import {sliderCustomHandle} from './helpers/slider-custom-mode'

const sliderStyle = {
  position: 'relative',
  zIndex: 0,
}

export const Timeline = () => {
  const {points, domainMax, domainMin} = usePoints()

  if (!points.length) return <></>
  return (
    <div className="w-100 max-w-full h-full flex items-center overflow-auto">
      <Slider
        mode={sliderCustomHandle}
        step={1000 * 60 * 15}
        domain={[domainMin, domainMax]}
        rootStyle={{...sliderStyle, width: `100%`}}
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

        <Ticks>
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
  )
}

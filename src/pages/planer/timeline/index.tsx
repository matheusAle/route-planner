import {useEffect, useState} from 'react'
import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'
import {usePlaner} from '../hooks/use-planer'

import {timelinePoint} from './types'
import {
  isHandleDisabled,
  onSliderChange,
  parseLegToTimelinePoint,
  parsePlaceToTimelinePoint,
} from './helpers'
import {Track} from './common/track'
import {SliderRail} from './common/slider-rail'
import {Handle} from './common/handle'
import {Tick} from './common/tick'

const sliderStyle = {
  position: 'relative',
  width: '100%',
  zIndex: 0,
}

export const Timeline = () => {
  // from context
  const {places, directions} = usePlaner()

  // slider variables
  const [domain, setDomain] = useState<{min: number; max: number}>({
    min: 0,
    max: 500,
  })
  const [values, setValues] = useState<timelinePoint[]>([])

  // make sure all values are present for the 1st time (avoid loop =\ )
  const [ready, setReady] = useState<boolean>(false)

  // on slider value changed
  const onChange = (newValues: readonly number[]) => {
    // check if component is ready
    if (!ready) return

    const valuesToSet: timelinePoint[] = onSliderChange([...values], newValues)
    setValues(valuesToSet)
  }

  // to set values (handles, etc.)
  useEffect(() => {
    // do NOT execute if directions data is not loaded
    if (!places.length || !directions?.routes?.length) return

    // set handles
    const valuesToSet: Array<timelinePoint> = []
    let atAcc = 0
    let stopTime = 8 * 3600
    const [{legs}] = directions.routes
    legs.forEach((leg, index) => {
      const stopPoint = parseLegToTimelinePoint(atAcc, leg)
      valuesToSet.push(stopPoint)
      atAcc += leg?.duration?.value || 0
      if (places[index + 1]) {
        const place = places[index]
        stopTime = index + 2 == places.length ? 0 : stopTime
        const placeToPush = parsePlaceToTimelinePoint(place, atAcc, stopTime)
        atAcc += placeToPush.duration
        valuesToSet.push(placeToPush)
      }
    })
    setValues(valuesToSet)
  }, [directions, places])

  // set domain
  useEffect(() => {
    // do not set domain for no values
    if (!values.length) return

    // go ahead!
    const maxDomainValue = values.reduce<number>(
      (acc, curr) => (acc += curr.duration),
      0,
    )
    const domainToSet = {min: 0, max: maxDomainValue}

    // set domain
    setDomain(domainToSet)

    // component is ready
    setReady(true)
  }, [values])

  return (
    <div className="w-100 flex items-center">
      <Slider
        mode={3}
        step={3}
        domain={[domain.min, domain.max]}
        rootStyle={sliderStyle}
        onChange={onChange}
        values={values.map(h => h.at)}
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
                  domain={[domain.min, domain.max]}
                  getHandleProps={getHandleProps}
                  disabled={isHandleDisabled(index, values.length)}
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
                  trackItem={track}
                  getTrackProps={getTrackProps}
                  disabled={values[index].type === 'stop'}
                  point={values[index]}
                />
              ))}
            </div>
          )}
        </Tracks>

        <Ticks count={16}>
          {({ticks}) => (
            <div className="slider-ticks">
              {ticks.map(tick => {
                const item: {name: string} = {
                  name: `${(tick.value / 3600).toFixed(0)} h`,
                }
                return (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    item={item}
                    count={ticks.length}
                  />
                )
              })}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}

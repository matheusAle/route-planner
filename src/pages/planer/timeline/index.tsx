import {useEffect, useState} from 'react'
import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'
import {usePlaner} from '../hooks/use-planer'
import {SliderRail, Handle, Track, Tick} from './components'

const sliderStyle = {
  position: 'relative',
  width: '100%',
  zIndex: 0,
}

const isHandleDisabled = (index: number, length: number): boolean => {
  return index === 0 || index % 2 === 1 || index + 1 === length
}

interface timelinePoint {
  type: 'stop' | 'move'
  name: string
  at: number
  distance: string
  duration: number
}

export const Timeline = () => {
  // from context
  const {places, directions} = usePlaner()

  // slider variables
  const [domain, setDomain] = useState<number[]>([0, 500])
  const [values, setValues] = useState<timelinePoint[]>([])

  // on slider value changed
  const onChange = (newValues: readonly number[]) => {
    const valuesToSet = [...values]
    console.log(valuesToSet)
    let acc = 0
    valuesToSet.forEach((value, index) => {
      const formValue = newValues[index]
      if (value.type === 'stop' && value.at !== formValue) {
        const diff = formValue - value.at
        if (diff != 1 && diff != -1) {
          acc = diff
          console.log(
            `Changed index ${index} from ${value.at} to ${formValue} = ${diff}`,
          )
        }
        if (value.type === 'stop') {
          value.at += acc
        }
      }
    })
    setValues(valuesToSet)
    //
  }

  // to set values (handles, etc.)
  useEffect(() => {
    // do NOT execute if directions data is not loaded
    if (!(places && directions)) return

    // do NOT execute if places and legs don't not match
    if (places.length !== directions.routes[0].legs.length + 1) return

    console.log('use effect - places and direction')

    console.log(places)
    console.log(directions)

    // set handles
    const valuesToSet: Array<timelinePoint> = []
    let atAcc = 0
    const stopTime = 8 * 3600
    const legs = directions.routes[0].legs
    legs.forEach((leg, index) => {
      valuesToSet.push({
        type: 'stop',
        name: '',
        at: atAcc,
        distance: leg?.distance?.text || '',
        duration: leg?.duration?.value || 0,
      })
      atAcc += leg?.duration?.value || 0
      if (places[index + 1]) {
        const place = places[index + 1]
        const lastPlace = index + 2 == places.length
        valuesToSet.push({
          type: 'move',
          name: place.name,
          at: atAcc,
          distance: '',
          duration: lastPlace ? 0 : stopTime,
        })
        atAcc += stopTime
      }
    })
    console.log(valuesToSet)
    setValues(valuesToSet)
  }, [directions, places])

  // set domain
  useEffect(() => {
    console.log('update domain')
    if (!values.length) return
    let maxDomainValue = 0
    for (const val of values) {
      maxDomainValue += val.duration
    }
    setDomain([0, maxDomainValue])
  }, [values])

  return (
    <div style={{margin: '10%', height: 120, width: '80%'}}>
      <h3 style={{paddingBottom: '20px'}}>
        Total traveling time: {(domain[1] / 3600).toFixed(0)} hours
      </h3>
      <Slider
        mode={3}
        step={3}
        domain={domain}
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
                  domain={domain}
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
              {tracks.map(({id, source, target}, index) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                  disabled={values[index].type === 'stop'}
                  item={values[index]}
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

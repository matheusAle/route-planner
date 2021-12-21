import {useEffect, useState} from 'react'
import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'
import {usePlaner} from '../hooks/use-planer'
import {SliderRail, Handle, Track, Tick} from './components'
import moment from 'moment'

const sliderStyle = {
  position: 'relative',
  width: '100%',
  zIndex: 0,
}

const defaultValues = [
  {name: 'place 1', at: 100, type: 'stop'},
  {name: 'moving', at: 200, type: 'move'},
  {name: 'place 2', at: 250, type: 'stop'},
  {name: 'moving', at: 400, type: 'move'},
  {name: 'place 2', at: 350, type: 'stop'},
]

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
  // const onChange = (newValues: readonly number[]) => {
  //   console.log('on change')
  //   const valuesToSet = [...values]
  //   valuesToSet.forEach((value, index) => {
  //     const formValue = newValues[index]
  //     if (value.type === 'stop' && value.at !== formValue) {
  //       value.at = formValue
  //     }
  //   })
  //   setValues(valuesToSet)
  //   //
  // }

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
    let leg = null
    const stopTime = 8 * 3600
    places.forEach((place, index, places) => {
      if (index > 0 && index + 1 < places.length) atAcc += stopTime
      leg = directions?.routes[0].legs[index]
      valuesToSet.push({
        type: 'stop',
        name: '',
        at: atAcc,
        distance: leg ? leg.distance!.text : '',
        duration: leg ? leg.duration!.value : 0,
      })
      if (directions?.routes[0].legs[index]) {
        atAcc += leg.duration?.value as number
        valuesToSet.push({
          name: places[index + 1].name,
          at: atAcc,
          distance: '',
          duration: index + 2 < places.length ? stopTime : 0,
          type: 'move',
        })
      }
    })
    setValues(valuesToSet)
  }, [directions, places])

  // set domain
  useEffect(() => {
    console.log('use effect - values')
    let maxDomainValue = 0
    for (const val of values) {
      maxDomainValue += val.duration
    }
    if (maxDomainValue != domain[1]) {
      console.log(maxDomainValue)
      setDomain([0, maxDomainValue])
    }
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
        // onChange={onChange}
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
              {ticks.map((tick, index) => {
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

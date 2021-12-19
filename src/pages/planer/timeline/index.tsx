import {useEffect, useState} from 'react'
import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'
import {usePlaner} from '../hooks/use-planer'
import {SliderRail, Handle, Track, Tick} from './components'

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

const firstOrLast = (index: number, length: number): boolean => {
  return index === 0 || index + 1 === length
}

interface timelineHandle {
  name: string
  type: string
  distance: string
  at: number
}

export const Timeline = () => {
  // from context
  const {places, directions} = usePlaner()
  // slider variables
  const [domain, setDomain] = useState<number[]>([0, 500])
  const [values, setValues] = useState<timelineHandle[]>([])
  // const values = defaultValues.map(v => v.at)
  // const {places, isPlacesLoading} = usePlaces(travel)
  // const {directions, setDirections} = useDirections()

  const onChange = (values: readonly number[]) => {
    console.log(values)
    //
  }

  useEffect(() => {
    // dont execute if directions is not loaded
    if (!(places && directions)) return
    // places and legs does not match
    if (places.length !== directions.routes[0].legs.length + 1) return

    console.log(places)
    console.log(directions)

    // set domain
    const stopTime = 8 * 3600
    const totalStopTime = stopTime * directions?.routes[0].legs.length
    let totalTripDuration = totalStopTime
    for (const leg of directions!.routes[0].legs) {
      totalTripDuration += leg.duration?.value as number
    }
    const domainToSet = [0, totalTripDuration]
    setDomain(domainToSet)

    // set handles
    const valuesToSet: timelineHandle[] = []
    let atAcc = 0
    let leg = null
    places.forEach((place, index, places) => {
      if (index > 0) atAcc += stopTime
      leg = directions?.routes[0].legs[index]
      console.log(leg)
      valuesToSet.push({
        name: '',
        at: atAcc,
        distance: leg ? leg.distance!.text : '',
        // distance: leg.distance!.text,
        type: 'stop',
      })
      if (directions?.routes[0].legs[index]) {
        atAcc += leg.duration?.value as number
        valuesToSet.push({
          name: places[index + 1].name,
          at: atAcc,
          distance: '',
          type: 'move',
        })
      }
    })
    console.log(valuesToSet)
    setValues(valuesToSet)
  }, [directions, places])

  return (
    <div style={{margin: '10%', height: 120, width: '80%'}}>
      <Slider
        mode={3}
        step={3}
        domain={domain}
        rootStyle={sliderStyle}
        // onUpdate={this.onUpdate}
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
                  disabled={firstOrLast(index, values.length)}
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
        <Ticks count={5}>
          {({ticks}) => (
            <div className="slider-ticks">
              {ticks.map((tick, index) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}

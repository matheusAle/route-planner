import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider'
import {SliderRail, Handle, Track, Tick} from './components'

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const domain = [100, 500]
const defaultValues = [
  {name: 'place 1', at: 100, type: 'stop'},
  {name: 'moving', at: 200, type: 'move'},
  {name: 'place 2', at: 250, type: 'stop'},
  {name: 'moving', at: 400, type: 'move'},
  {name: 'place 2', at: 350, type: 'stop'},
]

export const Timeline = () => {
  const values = defaultValues.map(v => v.at)

  return (
    <div style={{margin: '10%', height: 120, width: '80%'}}>
      <Slider
        mode={3}
        step={3}
        domain={domain}
        rootStyle={sliderStyle}
        // onUpdate={this.onUpdate}
        // onChange={this.onChange}
        values={values}
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
                  disabled={defaultValues[index].type === 'move'}
                  item={defaultValues[index]}
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

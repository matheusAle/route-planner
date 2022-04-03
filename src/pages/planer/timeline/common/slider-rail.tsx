import {GetRailProps} from 'react-compound-slider/dist/types/Rail/types'
import {useTimelineContext} from '../context'

const railOuterStyle = {
  position: 'absolute',
  // transform: 'translate(0%, -50%)',
  borderRadius: 7,
  cursor: 'pointer',
}

const railInnerStyle = {
  position: 'absolute',
  // transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
}

interface SliderRailProps {
  getRailProps: GetRailProps
}

export const SliderRail = ({getRailProps}: SliderRailProps) => {
  const {direction, width, height} = useTimelineContext()
  return (
    <>
      <div
        className="slider-rail"
        style={{
          ...railOuterStyle,
          ...(direction === 'vertical'
            ? {height: '100%', width}
            : {width: '100%', height}),
        }}
        {...getRailProps()}
      />
      <div
        style={{
          ...(railInnerStyle as any),
          ...(direction === 'vertical'
            ? {height: '100%', width}
            : {width: '100%', height}),
        }}
        className="bg-gray-400 bg-opacity-50"
      />
    </>
  )
}

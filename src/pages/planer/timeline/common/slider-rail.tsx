import {GetRailProps} from 'react-compound-slider/dist/types/Rail/types'

const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: 60,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  cursor: 'pointer',
  // border: '1px solid white',
}

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 60,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
}

interface SliderRailProps {
  getRailProps: GetRailProps
}

export const SliderRail = ({getRailProps}: SliderRailProps) => {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div
        style={railInnerStyle as any}
        className="bg-gray-400 bg-opacity-50"
      />
    </>
  )
}

import PropTypes from 'prop-types'

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: 42,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  cursor: 'pointer',
  // border: '1px solid white',
}

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
  backgroundColor: 'rgb(155,155,155)',
}

export function SliderRail({getRailProps}: any) {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle as any} />
    </>
  )
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
}

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({
  domain: [min, max],
  handle: {id, value, percent},
  disabled,
  getHandleProps,
}: any) {
  return (
    <>
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 28,
          height: 42,
          cursor: 'pointer',
          // border: '1px solid white',
          backgroundColor: 'none',
        }}
        {...(disabled ? {} : getHandleProps(id))}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: disabled ? '#666' : '#ffc400',
        }}
      />
    </>
  )
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

Handle.defaultProps = {
  disabled: false,
}

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export function KeyboardHandle({
  domain: [min, max],
  handle: {id, value, percent},
  disabled,
  getHandleProps,
}: any) {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: '50%',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
        backgroundColor: disabled ? '#666' : '#ffc400',
      }}
      {...getHandleProps(id)}
    />
  )
}

KeyboardHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

KeyboardHandle.defaultProps = {
  disabled: false,
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({source, target, getTrackProps, disabled, item}: any) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 14,
        zIndex: 1,
        backgroundColor: disabled ? '' : '#b28900',
        borderRadius: 7,
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '12px',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    >
      {item.name || item.distance}
      <br />
      {item.duration > 0 ? `${(item?.duration / 3600).toFixed(0)} hours` : ''}
    </div>
  )
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({tick, count, format, item}: any) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 32,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 38,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {item?.name}
      </div>
    </div>
  )
}

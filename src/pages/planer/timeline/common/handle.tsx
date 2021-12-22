export const Handle = ({
  domain: [min, max],
  handle: {id, value, percent},
  disabled,
  getHandleProps,
}: any) => {
  return (
    <>
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
          width: 36,
          height: 64,
          cursor: 'col-resize',
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
          width: 4,
          height: 64,
          backgroundColor: disabled ? '#666' : '#ffc400',
        }}
      />
    </>
  )
}

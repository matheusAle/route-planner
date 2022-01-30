import {cn} from 'common/utils/classnames'
import {MdDragIndicator} from 'react-icons/md'

export const Handle = ({
  domain: [min, max],
  handle: {id, value, percent},
  disabled,
  getHandleProps,
}: any) => {
  return (
    <>
      {!disabled && (
        <div
          {...getHandleProps(id)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn(
            'rounded-r flex items-center justify-center',
            'bg-primary bg-opacity-70 hover:bg-opacity-100 transition-colors duration-200',
          )}
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-100%, -50%)',
            zIndex: 2,
            width: 12,
            height: 64,
            cursor: 'col-resize',
          }}
        >
          <MdDragIndicator />
        </div>
      )}
    </>
  )
}

import {cn} from 'common/utils/classnames'
import {MdDragIndicator} from 'react-icons/md'
import {useTimelineContext} from '../context'

export const Handle = ({
  handle: {id, percent},
  disabled,
  getHandleProps,
}: any) => {
  const {direction, width, height} = useTimelineContext()

  return (
    <>
      {!disabled && (
        <div
          role="slider"
          className={cn(
            'rounded-r flex items-center justify-center',
            'bg-primary bg-opacity-70 hover:bg-opacity-100 transition-colors duration-200',
          )}
          style={{
            position: 'absolute',
            zIndex: 2,
            ...(direction === 'vertical'
              ? {
                  height: 12,
                  width,
                  top: `${percent}%`,
                  cursor: 'row-resize',
                }
              : {
                  width: 12,
                  height,
                  left: `${percent}%`,
                  transform: 'translate(-100%, 0%)',
                  cursor: 'col-resize',
                }),
          }}
          {...getHandleProps(id)}
        >
          <MdDragIndicator />
        </div>
      )}
    </>
  )
}

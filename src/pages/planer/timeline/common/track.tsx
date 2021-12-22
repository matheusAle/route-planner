import {cn} from 'common/utils/classnames'
import {GetTrackProps, TrackItem} from 'react-compound-slider'
import {timelinePoint} from '../types'

interface TrackProps {
  point: timelinePoint
  disabled: boolean
  trackItem: TrackItem
  getTrackProps: GetTrackProps
}

export const Track = ({
  trackItem: {target, source},
  getTrackProps,
  disabled,
  point,
}: TrackProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 64,
        zIndex: 1,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      className={cn({'bg-primary': !disabled}, 'rounded-l')}
      {...getTrackProps()}
    >
      <div className="card compact">
        <div className="card-body">
          <p className="text-sm">{point.name || point.distance}</p>
          <p className="text-xsm">
            {point.duration > 0
              ? `${(point?.duration / 3600).toFixed(0)} hours`
              : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

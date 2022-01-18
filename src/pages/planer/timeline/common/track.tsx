import {useMemo} from 'react'
import {GetTrackProps, TrackItem} from 'react-compound-slider'
import {MdLocationPin} from 'react-icons/md'
import {parseDistanceTime} from '../helpers/parse-distance'
import {TimelinePoint} from '../types'

interface TrackProps {
  point: TimelinePoint
  trackItem: TrackItem
  getTrackProps: GetTrackProps
}

const EdgePin = ({point}: Pick<TrackProps, 'point'>) => (
  <div
    className="flex whitespace-nowrap"
    style={{transform: 'translateY(-100%)'}}
  >
    <MdLocationPin />
    <p className="text-sm">{point.name}</p>
  </div>
)

const Place = ({point}: Pick<TrackProps, 'point'>) => (
  <div className="card compact bg-primary overflow-hidden whitespace-nowrap h-full rounded-none">
    <div className="card-body">
      <p className="text-sm">{point.name}</p>
    </div>
  </div>
)

const Move = ({point}: Pick<TrackProps, 'point'>) => {
  const distance = useMemo(
    () => parseDistanceTime(point.duration),
    [point.duration],
  )
  return (
    <div className="card compact">
      <div className="card-body">
        <p className="text-sm">{point.distance}</p>
        <p className="text-xs">{distance}</p>
      </div>
    </div>
  )
}

export const Track = ({trackItem: {target, source}, point}: TrackProps) => {
  const content = () => {
    if (point.isEdge) return <EdgePin point={point} />

    return point.type === 'move' ? (
      <Move point={point} />
    ) : (
      <Place point={point} />
    )
  }

  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        left: `${source.percent}%`,
        height: 64,
        zIndex: 1,
        width: `${target.percent - source.percent}%`,
      }}
    >
      {content()}
    </div>
  )
}

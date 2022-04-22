import {useMemo} from 'react'
import {GetTrackProps, TrackItem} from 'react-compound-slider'
import {MdLocationPin} from 'react-icons/md'
import {parseDistanceTime} from 'common/utils/parse-distance'
import {Point, TimelinePointMove, TimelinePointPlace} from '../types'

interface TrackProps {
  point: Point
  trackItem: TrackItem
  getTrackProps: GetTrackProps
}

const EdgePin = ({point}: {point: any}) => (
  <div
    className="flex whitespace-nowrap items-center"
    style={{transform: 'translateY(-100%)', marginLeft: -5}}
  >
    <div className="w-7">
      <MdLocationPin />
    </div>
    <p className="text-sm">{point?.place?.name}</p>
  </div>
)

const Place = ({point}: {point: TimelinePointPlace}) => (
  <div className="card compact bg-primary overflow-hidden whitespace-nowrap h-full rounded-none">
    <div className="card-body">
      <p className="text-sm">{point.place.name}</p>
    </div>
  </div>
)

const Move = ({point}: {point: TimelinePointMove}) => {
  const distance = useMemo(
    () =>
      point.leg?.duration?.value && parseDistanceTime(point.leg.duration.value),
    [point.leg],
  )
  return (
    <div className="card compact">
      <div className="card-body overflow-hidden whitespace-nowrap">
        <p className="text-sm">{point.leg?.duration?.text}</p>
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
      <Place point={point as any} />
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

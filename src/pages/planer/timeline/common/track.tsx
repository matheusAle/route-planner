import {useMemo} from 'react'
import {GetTrackProps, TrackItem} from 'react-compound-slider'
import {MdLocationPin} from 'react-icons/md'
import {parseDistanceTime} from 'common/utils/parse-distance'
import {Point, TimelinePointMove, TimelinePointPlace} from '../types'
import {useTimelineContext} from '../context'

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
  const duration = useMemo(
    () =>
      point.leg?.duration?.value && parseDistanceTime(point.leg.duration.value),
    [point.leg],
  )
  return (
    <div className="card compact">
      <div className="card-body overflow-hidden whitespace-nowrap">
        <p className="text-sm">{duration}</p>
        <p className="text-xs">{point.leg?.distance?.text}</p>
      </div>
    </div>
  )
}

export const Track = ({trackItem: {target, source}, point}: TrackProps) => {
  const {direction, width, height} = useTimelineContext()
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
        // transform: 'translate(0%, -50%)',
        zIndex: 1,
        ...(direction === 'vertical'
          ? {
              top: `${source.percent}%`,
              height: `${target.percent - source.percent}%`,
              width,
            }
          : {
              left: `${source.percent}%`,
              width: `${target.percent - source.percent}%`,
              height,
            }),
      }}
    >
      {content()}
    </div>
  )
}

import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useMemo} from 'react'
import {generateTimelinePoints} from '../helpers/generate-timeline-points'
import {DomainType} from '../types'

export const useDomainPoints = ([domainMin, domainMax]: DomainType) => {
  const {places, directions, travel} = usePlaner()

  const points = useMemo(() => {
    if (!places.length || !directions?.routes?.length) return []

    return generateTimelinePoints({
      places,
      directions,
      domainMin,
      travel,
    })
  }, [directions, places, domainMin, travel])

  const pointsValues = useMemo(() => points.map(p => p.at), [points])

  return {
    points,
    domainMax,
    domainMin,
    pointsValues,
  }
}

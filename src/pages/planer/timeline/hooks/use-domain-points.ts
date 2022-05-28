import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useMemo} from 'react'
import {generateTimelinePoints} from '../helpers/generate-timeline-points'
import {DomainType} from '../types'

export const useDomainPoints = ([domainMin, domainMax]: DomainType) => {
  const {placesInRoute, directions, travel} = usePlaner()

  const points = useMemo(() => {
    if (!placesInRoute.length || !directions?.routes?.length) return []

    return generateTimelinePoints({
      places: placesInRoute,
      directions,
      domainMin,
      travel,
    })
  }, [directions, placesInRoute, domainMin, travel])

  const pointsValues = useMemo(() => points.map(p => p.at), [points])

  return {
    points,
    domainMax,
    domainMin,
    pointsValues,
  }
}

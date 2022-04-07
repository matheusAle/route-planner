import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useMemo} from 'react'
import {generateTimelinePoints} from '../helpers/generate-timeline-points'
import {DomainType} from '../types'

export const useDomainPoints = ([domainMin, domainMax]: DomainType) => {
  const {places, directions} = usePlaner()

  const points = useMemo(() => {
    if (!places.length || !directions?.routes?.length) return []

    return generateTimelinePoints({
      places,
      directions,
      domainMin,
    })
  }, [directions, places, domainMin])

  const pointsValues = useMemo(() => points.map(p => p.at), [points])

  return {
    points,
    domainMax,
    domainMin,
    pointsValues,
  }
}

import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useMemo} from 'react'
import {generateTimelinePoints} from '../helpers/generate-timeline-points'
import {useDomain} from './use-domain'

export const usePoints = () => {
  const [domainMin, domainMax] = useDomain()
  const {places, directions} = usePlaner()

  const points = useMemo(() => {
    if (!places.length || !directions?.routes?.length) return []

    return generateTimelinePoints({
      places,
      directions,
      domainMin,
    })
  }, [directions, places, domainMin])

  const values = useMemo(() => points.map(p => p.at), [points])

  return {
    points,
    domainMax,
    domainMin,
    values,
  }
}

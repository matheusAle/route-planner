import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useMemo} from 'react'
import {generateTimelinePoints} from '../helpers/generate-timeline-points'
import {useDomain} from './use-domain'

export const usePoints = () => {
  const [domainMin, domainMax] = useDomain()
  const {places, directions} = usePlaner()

  const points = useMemo(() => {
    // do NOT execute if directions data is not loaded
    if (!places.length || !directions?.routes?.length) return []

    return generateTimelinePoints({
      places,
      directions,
      domainMin,
    })
  }, [directions, places, domainMin])

  return {
    points,
    domainMax,
    domainMin,
  }
}

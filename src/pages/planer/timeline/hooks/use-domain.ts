import {parseISO} from 'date-fns'
import {usePlaner} from 'pages/planer/hooks/use-planer'
import {useMemo} from 'react'
import {DomainType} from '../types'

export const useDomain = (): DomainType => {
  const {
    travel: {startDate, endDate},
  } = usePlaner()

  return useMemo(() => {
    if (!startDate || !endDate) return [0, 0]
    const min = parseISO(startDate).valueOf()
    const end = parseISO(endDate).valueOf()

    return [min, end]
  }, [startDate, endDate])
}

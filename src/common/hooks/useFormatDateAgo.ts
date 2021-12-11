import {formatDistanceToNow, parseISO} from 'date-fns'
import {useMemo} from 'react'

export const useFormatDateAgo = (date: string) => {
  return useMemo(() => formatDistanceToNow(parseISO(date)), [date])
}

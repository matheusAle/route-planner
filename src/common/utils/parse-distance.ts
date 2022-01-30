import intervalToDuration from 'date-fns/intervalToDuration'
import formatDuration from 'date-fns/formatDuration'

export function parseDistanceTime(distance: number) {
  const ref = new Date(2000, 0, 0, 0).valueOf()
  const duration = intervalToDuration({
    start: ref,
    end: ref + distance * 1000,
  })

  let text = formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
  })

  if (text.includes('days')) text = text.replace(/ \d{1,2} minutes/, '')

  return text.replace(/(\d{1,2}) hours?/, '$1h')
}

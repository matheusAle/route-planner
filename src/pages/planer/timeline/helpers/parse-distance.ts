export function parseDistanceTime(distance: number) {
  const [hours, minutes] = (distance / 60 / 60).toFixed(2).toString().split('.')

  if (minutes === '00') return `${hours}h`
  return `${hours}h ${minutes} min`
}

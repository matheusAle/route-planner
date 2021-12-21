export interface timelinePoint {
  type: 'stop' | 'move'
  name: string
  at: number
  distance: string
  duration: number
}

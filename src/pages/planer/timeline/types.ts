export interface TimelinePoint {
  type: 'stop' | 'move'
  at: number
  name: string
  distance?: string
  duration: number
  isEdge?: boolean
}

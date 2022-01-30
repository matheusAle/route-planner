import {Place} from 'common/types/place'

export interface TimelinePoint {
  type: string
  at: number
  isEdge?: boolean
}

export interface TimelinePointPlace extends TimelinePoint {
  type: 'stop'
  place: Place
}

export interface TimelinePointMove extends TimelinePoint {
  type: 'move'
  leg?: google.maps.DirectionsLeg
}

export type Point = TimelinePointMove | TimelinePointPlace

import {scaleTime} from 'd3-scale'
import {useEffect, useState} from 'react'
import {DomainType} from '../types'

const zoomValues = [
  {label: '15 minutos', value: 92 * 4},
  {label: '30 minutos', value: 48},
  {label: '1h', value: 24},
  {label: '2h', value: 12},
  {label: '4h', value: 4},
]

export const useScaleTicks = ([domainMin, domainMax]: DomainType) => {
  const [zoom, setZoom] = useState(zoomValues[2].value)
  const [ticks, setTicks] = useState<number[]>([])

  useEffect(() => {
    const scaleValues = scaleTime()
      .domain([domainMin, domainMax])
      .ticks(3 * zoom)
      .map((d: any) => +d)
    setTicks(scaleValues)
  }, [zoom, domainMin, domainMax])

  return {
    zoomOptions: zoomValues,
    zoom,
    setZoom,
    ticks,
  }
}

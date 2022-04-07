import {createContext, FC, useContext} from 'react'
import {useDomain} from './hooks/use-domain'
import {useDomainPoints} from './hooks/use-domain-points'
import {useScaleTicks} from './hooks/use-scale-ticks'
import {Point} from './types'

interface Context {
  domain: ReturnType<typeof useDomain>
  points: Point[]
  pointsValues: number[]
  scale: ReturnType<typeof useScaleTicks>
}

const context = createContext<Context>(null as any)

export const useTimelimeContext = () => useContext(context)

export const TimelineContextProvider: FC = ({children}) => {
  const domain = useDomain()
  const {points, pointsValues} = useDomainPoints(domain)
  const scale = useScaleTicks(domain)

  return (
    <context.Provider value={{domain, points, pointsValues, scale}}>
      {children}
    </context.Provider>
  )
}

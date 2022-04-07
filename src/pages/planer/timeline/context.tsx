import {createContext, FC, useContext} from 'react'
import {useDomain} from './hooks/use-domain'
import {useDomainPoints} from './hooks/use-domain-points'
import {Point} from './types'

interface Context {
  domain: [number, number]
  points: Point[]
  pointsValues: number[]
}

const context = createContext<Context>(null as any)

export const useTimelimeContext = () => useContext(context)

export const TimelineContextProvider: FC = ({children}) => {
  const domain = useDomain()
  const {points, pointsValues} = useDomainPoints(domain)
  return (
    <context.Provider value={{domain, points, pointsValues}}>
      {children}
    </context.Provider>
  )
}

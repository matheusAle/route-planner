import {Place} from '@/common/types/place'
import {Travel} from '@/common/types/travel'
import {createContext, PropsWithChildren, useContext} from 'react'

interface PlanerContext {
  selectedPlace?: Place
  selectPlace(p: Place): void
  places: Place[]
  travel: Travel
}

const context = createContext<PlanerContext>({} as any)

export const PlanerContextProvider = ({
  children,
  ...props
}: PropsWithChildren<PlanerContext>) => {
  return <context.Provider value={props}>{children}</context.Provider>
}

export const usePlaner = () => useContext(context)

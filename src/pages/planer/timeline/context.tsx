import {createContext, FC, useContext} from 'react'

export interface TimelineContextState {
  direction: 'vertical' | 'horizontal'
  width: string
  height: string
}

const context = createContext<TimelineContextState>(null as any)

export const useTimelineContext = () => useContext(context)

export const TimelineContextProvider: FC<TimelineContextState> = ({
  children,
  ...props
}) => {
  return <context.Provider value={props}>{children}</context.Provider>
}

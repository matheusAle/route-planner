/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import Sheet, {SheetRef} from 'react-modal-sheet'

import {useLocationStateKey} from '@/common/hooks/use-location-state-key'

import {cn} from '@/common/utils/classnames'

const Container = Sheet.Container as any
const Backdrop = Sheet.Backdrop as any
const Header = Sheet.Header as any
const Content = Sheet.Content as any

export interface ModalProps {
  name?: string
  open: boolean
  setOpen(v: boolean): void
  fitContent?: boolean
  header?:
    | React.ReactNode
    | ((props: {
        snapPoint: number
        snapTo(index: number): void
      }) => React.ReactNode)
  children?: React.ReactNode
  snapPoints?: number[]
  backdrop?: boolean
  initialSnap?: number
}

export function Modal({
  name = 'modal',
  open,
  setOpen,
  header,
  children,
  fitContent,
  backdrop,
  snapPoints,
  initialSnap,
}: ModalProps) {
  const ref = React.useRef<SheetRef>()
  const [state, setState] = useLocationStateKey(name)
  const [snapPoint, setSnapPoint] = React.useState(initialSnap || 0)

  const snapTo = (i: number) => ref.current?.snapTo(i)

  useEffect(() => {
    if (state !== open) {
      setOpen(state)
    }
  }, [state])

  useEffect(() => {
    if (state !== open) {
      setState(open)
    }
  }, [open])

  return (
    <Sheet
      ref={ref}
      isOpen={true}
      onClose={() => setState(false)}
      className={cn({'modal-sheet-fit-content': fitContent})}
      snapPoints={snapPoints}
      onSnap={setSnapPoint}
      initialSnap={initialSnap}
    >
      <Container>
        <Header>
          {typeof header === 'function' ? header({snapTo, snapPoint}) : header}
        </Header>
        <Content>
          <div className="p-4 pb-10">{children}</div>
        </Content>
      </Container>

      {backdrop ? <Backdrop /> : <></>}
    </Sheet>
  )
}

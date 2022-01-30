import {Modal} from 'common/components/modal'
import {cn} from 'common/utils/classnames'
import {PropsWithChildren} from 'react'
import {MdChevronLeft} from 'react-icons/md'
import {usePlaner} from '../../hooks/use-planer'

const snapPoints = [-48, 48]

const SNAP_BOTTON = 1
const SNAP_TOP = 0

export const PlacesModal = ({children}: PropsWithChildren<any>) => {
  const {places} = usePlaner()

  return (
    <Modal
      open={true}
      setOpen={() => void 0}
      snapPoints={snapPoints}
      initialSnap={places.length ? SNAP_BOTTON : SNAP_TOP}
      header={({snapTo, snapPoint}) => (
        <MdChevronLeft
          size="2rem"
          onClick={() =>
            places.length &&
            snapTo(snapPoint === SNAP_BOTTON ? SNAP_TOP : SNAP_BOTTON)
          }
          className={cn(
            'text-gray-300 mx-auto transition-transform transform',
            {
              'rotate-90': snapPoint === SNAP_BOTTON,
              '-rotate-90': snapPoint === SNAP_TOP,
            },
          )}
        />
      )}
    >
      {children}
    </Modal>
  )
}

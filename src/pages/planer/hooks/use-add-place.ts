import {getPositionForIndex} from '@/common/components/virtual-list/helpers'
import {getMessage} from '@/common/firebase/error'
import {Col, createRef, setDoc} from '@/common/firebase/firestore'
import {useUser} from '@/common/hooks/use-user'
import {errorNotification} from '@/common/notification'
import {Place} from '@/common/types/place'
import {usePlaner} from './use-planer'

export const useAddPlace = () => {
  const {travel, places} = usePlaner()
  const {user} = useUser()

  return (place: Omit<Place, 'order'>) => {
    const order = getPositionForIndex(
      places.map(p => p.order),
      places.length,
    )

    const ref = createRef<Place>(Col.travelsPlaces(user, travel), place.uid)
    setDoc(ref, {
      ...place,
      order,
    }).catch(err => errorNotification(getMessage(err)))
  }
}

import {getMessage} from 'common/firebase/error'
import {Col, createRef, updateDoc} from 'common/firebase/firestore'
import {useUser} from 'common/hooks/use-user'
import {errorNotification} from 'common/notification'
import {Place} from 'common/types/place'
import {usePlaner} from './use-planer'

export const useUpdatePlace = () => {
  const {travel} = usePlaner()
  const {user} = useUser()

  return (place: Place) => {
    const ref = createRef<Place>(Col.travelsPlaces(user, travel), place.uid)
    updateDoc(ref, place).catch(err => errorNotification(getMessage(err)))
  }
}

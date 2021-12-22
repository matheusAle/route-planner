import {getMessage} from 'common/firebase/error'
import {Col, createRef, updateDoc} from 'common/firebase/firestore'
import {useUser} from 'common/hooks/use-user'
import {errorNotification} from 'common/notification'
import {Travel} from 'common/types/travel'

export const useUpdateTravel = () => {
  const {user} = useUser()

  return (travel: Travel) => {
    const ref = createRef<Travel>(Col.travel(user, travel))
    updateDoc(ref, travel).catch(err => errorNotification(getMessage(err)))
  }
}

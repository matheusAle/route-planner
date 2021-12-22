import {getMessage} from 'common/firebase/error'
import {createRef, setDoc, Col} from 'common/firebase/firestore'
import {useUser} from 'common/hooks/use-user'
import {errorNotification} from 'common/notification'
import {Travel} from 'common/types/travel'
import {nowAsUtcString} from 'common/utils/date'
import {getUid} from 'common/utils/uid'

export const useCreateTravel = () => {
  const {user} = useUser()

  return () => {
    const name = prompt('Name: ')
    if (!name) return

    const travel: Travel = {
      name,
      uid: getUid(),
      editAt: nowAsUtcString(),
    }

    const ref = createRef(Col.travels(user), travel.uid)
    setDoc(ref, travel).catch(err => errorNotification(getMessage(err)))
  }
}

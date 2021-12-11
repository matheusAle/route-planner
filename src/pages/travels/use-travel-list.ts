import {createRef, onSnapshot} from '@/common/firebase/firestore'
import {useUser} from '@/common/hooks/use-user'
import {Travel, UserTravelsDocument} from '@/common/types/travel'
import {useEffect, useState} from 'react'

export const useTravelList = () => {
  const {user} = useUser()
  const [list, setList] = useState<Travel[]>([])

  useEffect(() => {
    if (!user) return setList([])
    const ref = createRef<UserTravelsDocument>(user.uid, 'travels')

    return onSnapshot(ref, doc => {
      setList(doc.data()?.items || [])
    })
  }, [user])

  return list
}

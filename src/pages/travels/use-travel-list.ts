import {Col, createColRef, onSnapshot} from 'common/firebase/firestore'
import {useUser} from 'common/hooks/use-user'
import {Travel} from 'common/types/travel'
import {useEffect, useState} from 'react'

export const useTravelList = () => {
  const {user} = useUser()
  const [list, setList] = useState<Travel[]>([])

  useEffect(() => {
    if (!user) return setList([])
    const ref = createColRef<Travel>(Col.travels(user))

    return onSnapshot(ref, doc => {
      setList(doc.docs.map(i => i.data()) || [])
    })
  }, [user])

  return list
}

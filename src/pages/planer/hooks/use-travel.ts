import {createRef, Col, onSnapshot} from 'common/firebase/firestore'
import {useData} from 'common/hooks/use-data'
import {useUser} from 'common/hooks/use-user'
import {Travel} from 'common/types/travel'
import {useEffect} from 'react'
import {useParams} from 'react-router'

export const useTravel = () => {
  const {data, isLoading, setLoading, setData} = useData<Travel>()
  const {user} = useUser()
  const {travel} = useParams<'travel'>()

  useEffect(() => {
    if (!travel) return
    setLoading(true)

    const ref = createRef<Travel>(Col.travels(user), travel)

    return onSnapshot(ref, doc => {
      const data = doc.data()
      if (data) setData(data)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travel])

  return {
    travel: data,
    isTravelLoading: isLoading,
  }
}

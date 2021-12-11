/* eslint-disable react-hooks/exhaustive-deps */
import {Place} from '@/common/types/place'
import {Col, createColRef, onSnapshot} from '@/common/firebase/firestore'
import {useData} from '@/common/hooks/use-data'
import {useUser} from '@/common/hooks/use-user'
import {Travel} from '@/common/types/travel'
import {useEffect} from 'react'

export const usePlaces = (travel?: Travel) => {
  const {data, isLoading, setLoading, setData} = useData<Place[]>([])
  const {user} = useUser()

  useEffect(() => {
    if (!travel) return
    const ref = createColRef<Place>(Col.travelsPlaces(user, travel))
    return onSnapshot(ref, col => {
      const docs = col.docs.map(d => d.data())
      const sorted = docs.sort((a, b) => a.order - b.order)
      setData(sorted)
      setLoading(false)
    })
  }, [travel])

  return {
    places: data,
    isPlacesLoading: isLoading,
  }
}

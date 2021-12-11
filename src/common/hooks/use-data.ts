import {useState} from 'react'

export const useData = <T>(initial?: T) => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<T>(initial as T)

  return {
    data,
    setData,
    isLoading,
    setLoading,
  }
}

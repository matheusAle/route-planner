import {useCallback} from 'react'
import {useLocation, useNavigate} from 'react-router'

export const useLocationStateKey = <V = boolean>(
  key: string,
): [V, (v: V) => void] => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentLocationState = location.state || {}

  const appendStateItemValue = useCallback((value: V) => {
    const newLocationState = {...currentLocationState}
    newLocationState[key] = value
    navigate(location.pathname, newLocationState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stateItemValue = location.state && location.state[key]

  return [stateItemValue, appendStateItemValue]
}

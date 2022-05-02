import React from 'react'
import {useUser} from '../common/hooks/use-user'

export const Loader: React.FC<any> = ({children}) => {
  const {isLoadingUser} = useUser()

  return !isLoadingUser ? children : <></>
}

import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useUser} from '../common/hooks/use-user'
import {LOGIN_URL} from '../common/routes-urls'

export const Loader: React.FC<any> = ({children}) => {
  const {user, isLoadingUser} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log({isLoadingUser, user})
    if (!isLoadingUser && !user) navigate(LOGIN_URL, {replace: true})
  }, [isLoadingUser, user, navigate])

  return !isLoadingUser ? children : <></>
}

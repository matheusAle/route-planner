import {auth, onAuthStateChanged, User} from '../firebase/auth'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import React from 'react'
import {useNavigate} from 'react-router'
import {LOGIN_URL} from 'common/routes-urls'

export interface UserContext {
  isLoadingUser: boolean
  user: User
}

const userContext = createContext<UserContext>({
  isLoadingUser: true,
  user: null as any,
})

export const UserContextProvider = ({children}: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User>(null as unknown as User)
  const [isLoadingUser, setLoadingUser] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, data => {
      if (!data) {
        return navigate(LOGIN_URL)
      }
      setUser(data)
      setLoadingUser(false)
    })
  }, [])

  return (
    <userContext.Provider value={{user, isLoadingUser}}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => useContext(userContext)

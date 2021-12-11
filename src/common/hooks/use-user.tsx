import {auth, onAuthStateChanged, User} from '../firebase/auth'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import React from 'react'

export interface UserContext {
  isLoadingUser: boolean
  user: User | null
}

const userContext = createContext<UserContext>({
  isLoadingUser: true,
  user: null,
})

export const UserContextProvider = ({children}: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, data => {
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

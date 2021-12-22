import {auth, createUserWithEmailAndPassword} from 'common/firebase/auth'
import {getMessage} from 'common/firebase/error'
import {errorNotification} from 'common/notification'

export const useUserRegister = () => {
  return (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).catch(err => {
      errorNotification(getMessage(err))
    })
}

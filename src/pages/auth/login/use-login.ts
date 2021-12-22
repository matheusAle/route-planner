import {auth, signInWithEmailAndPassword} from 'common/firebase/auth'
import {getMessage} from 'common/firebase/error'
import {errorNotification} from 'common/notification'

export const useLogin = () => {
  return (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).catch(err => {
      errorNotification(getMessage(err))
    })
}

import {auth, signInWithEmailAndPassword} from 'common/firebase/auth'

export const useLogin = () => {
  return (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
}

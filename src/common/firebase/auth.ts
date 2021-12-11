import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  User,
} from 'firebase/auth'
import {app} from './app'

const auth = getAuth(app)
setPersistence(auth, browserSessionPersistence)

export {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
}

export type {User}

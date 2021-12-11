export * from 'firebase/firestore'
import {
  getFirestore,
  doc,
  DocumentReference,
  collection,
} from 'firebase/firestore'
import {app} from './app'

const db = getFirestore(app)

export const createRef = <T>(
  path: string,
  ...fragments: string[]
): DocumentReference<T> => doc(db, path, ...fragments) as any

export const createColRef = <T>(
  path: string,
  ...fragments: string[]
): DocumentReference<T> => collection(db, path, ...fragments) as any

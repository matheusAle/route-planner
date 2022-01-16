export * from 'firebase/firestore'
import {User} from 'firebase/auth'
import {
  getFirestore,
  doc,
  DocumentReference,
  collection,
  CollectionReference,
} from 'firebase/firestore'
import {Travel} from '../types/travel'
import {app} from './app'

const db = getFirestore(app)

export const createRef = <T>(
  path: string,
  ...fragments: string[]
): DocumentReference<T> => doc(db, path, ...fragments) as any

export const createColRef = <T>(
  path: string,
  ...fragments: string[]
): CollectionReference<T> => collection(db, path, ...fragments) as any

export const Col = {
  travels: (user: User) => `${user.uid}/travels/own`,
  travel: (user: User, travel: Travel) =>
    `${user.uid}/travels/own/${travel.uid}`,
  travelsPlaces: (user: User, travel: Travel) =>
    `${user.uid}/travels/own/${travel.uid}/places`,
}

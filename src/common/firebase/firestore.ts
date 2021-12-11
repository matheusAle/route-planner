import {getDatabase, onValue, ref, get} from 'firebase/database'
import {app} from './app'

const db = getDatabase(app)

export {db, onValue, ref, get}

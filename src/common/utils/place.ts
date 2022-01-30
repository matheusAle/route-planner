import {Place} from 'common/types/place'
import {address, datatype} from 'faker'

export const generateTestPlace = (base: Partial<Place> = {}): Place => {
  const name = address.city()
  const place_id = datatype.uuid()

  return {
    address: name,
    name,
    geo: {
      lat: 0,
      lng: 0,
    },
    order: 20,
    stayTime: 1000 * 60 * 60,
    uid: place_id,
    place_id,
    url: '',
    ...base,
  }
}

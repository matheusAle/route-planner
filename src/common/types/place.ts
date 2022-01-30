export interface Place {
  geo: {
    lat: number
    lng: number
  }
  uid: string
  place_id: string
  name: string
  url: string
  address: string
  order: number
  stayTime: number
}

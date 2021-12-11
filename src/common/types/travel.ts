export interface Travel {
  name: string
  uid: string
  editAt: string
}

export interface UserTravelsDocument {
  items: Travel[]
}

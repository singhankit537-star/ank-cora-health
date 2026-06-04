export type UserRole = 'admin' | 'client'

export interface Clinic {
  city: string
  state: string
  address: string[]
  phone: string
  lat: number
  lng: number
}

export interface Leader {
  name: string
  title: string
  image: string
}

export type ApiUser = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  address: {
    city: string
  }
  company: {
    name: string
  }
}

export type EditableUser = {
  id: number
  name: string
  username: string
  email: string
  city: string
  phone: string
  companyName: string
}

export type UserOverrides = Omit<EditableUser, 'id'>

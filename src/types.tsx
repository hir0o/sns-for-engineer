type Common = {
  _created_at: string
  _updated_at: string
  _user_id: string
}

export type Post = {
  id: string
  text: string
} & Common

export type User = {
  id: string
  description: string
  name: string
} & Common

export type Users = {
  [id: string]: {
    description: string
    name: string
  }
}

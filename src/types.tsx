type Common = {
  _created_at: string
  _updated_at: string
  _user_id: string
}
type You = {
  name: string
  age: string
  friend: boolean
}

export type Post = {
  id: string
  text: string
  in_reply_to_text_id?: string
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
    id: string
  }
}

export type SingleUser = Pick<User, 'name' | 'description' | 'id'>

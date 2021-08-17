import { useContext, useEffect, useState } from 'react'
import { UsersContext } from '../App'
import { SingleUser } from '../types'

export const useUser = (userId: string): SingleUser | undefined => {
  const users = useContext(UsersContext)
  const [user, setUser] = useState<SingleUser>({} as SingleUser)

  useEffect(() => {
    setUser(users[userId])
  }, [])

  return user
}

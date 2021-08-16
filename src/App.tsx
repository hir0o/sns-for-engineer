import React, { VFC } from 'react'
import Header from './components/Header'
import Feed from './components/Feed'
import './grobal.css'
import ContentContainer from './components/ContentContainer'
import { User, Users } from './types'
import { useFetch } from './hooks/useFetch'
import { useState } from 'react'
import { useEffect } from 'react'

export const UsersContext = React.createContext<Users>([])

const App: VFC = () => {
  const { data, error, isValidating } = useFetch<User[]>(
    'https://versatileapi.herokuapp.com/api/user/all'
  )
  const [users, setUsers] = useState<Users>({})

  useEffect(() => {
    let tmpUsers: Users = {}
    data?.forEach((item) => {
      tmpUsers[item.id] = {
        name: item.name,
        description: item.description,
      }
    })
    setUsers(tmpUsers)
  }, [])

  if (!data) return <p>userが取得できませんでした。</p>

  return (
    <UsersContext.Provider value={users}>
      <Header />
      <ContentContainer>
        <Feed />
      </ContentContainer>
    </UsersContext.Provider>
  )
}

export default App

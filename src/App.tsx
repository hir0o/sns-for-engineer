import React, { VFC, useState, useEffect } from 'react'
import Header from './components/Header'
import './grobal.css'
import { User, Users } from './types'
import { useFetch } from './hooks/useFetch'
import Routes from './Routes'
import Layouts from './components/Layouts'
import { BrowserRouter as Router } from 'react-router-dom'

export const UsersContext = React.createContext<Users>({})

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
  }, [data])

  if (!data) {
    if (isValidating) return <p>Loading</p>
    return <p>Feedを取得できませんでした。</p>
  }

  return (
    <Router>
      <UsersContext.Provider value={users}>
        <Header />
        <Layouts>
          <Routes />
        </Layouts>
      </UsersContext.Provider>
    </Router>
  )
}

export default App

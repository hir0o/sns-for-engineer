import { useCallback, VFC, useState } from 'react'
import styled from 'styled-components'
import useIp from '../hooks/useIp'
import useLocalStorage from '../hooks/useLocalStorage'
import { User } from '../types'

type SingleUser = Pick<User, 'name' | 'description' | 'id'>

const MyPage: VFC = () => {
  const ip = useIp()

  const [user, setUser] = useLocalStorage<SingleUser>('123user')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const hunleSubmit = useCallback(async () => {
    await fetch('https://versatileapi.herokuapp.com/api/user/create_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
      }),
    })
    setUser({ name, description, id: 'hoge' })
  }, [name, description])

  return (
    <StyledMyPage>
      <p>mypage</p>
      <h1>IP: {ip}</h1>
      <h1>ID: {user?.id}</h1>
      <h1>name: {user?.name}</h1>
      <h1>description: {user?.description}</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={() => {
          hunleSubmit()
        }}
      >
        送信
      </button>
    </StyledMyPage>
  )
}

const StyledMyPage = styled.div`
  display: block;
`

export default MyPage

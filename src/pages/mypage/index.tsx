import React, { useCallback, VFC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import useIp from '../../hooks/useIp'
import useLocalStorage from '../../hooks/useLocalStorage'
import { User } from '../../types'

type SingleUser = Pick<User, 'name' | 'description' | 'id'>

const MyPage: VFC = () => {
  const ip = useIp()

  const [user, setUser] = useLocalStorage<SingleUser>('123user')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const hunleSubmit = useCallback(async () => {
    const { id } = await fetch(
      'https://versatileapi.herokuapp.com/api/user/create_user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    ).then((res) => res.json())

    setUser({ name, description, id })
  }, [name, description])

  return (
    <StyledMyPage>
      <div className="my-page__contents">
        <div className="mypage__header">
          <h2>ユーザー情報</h2>
        </div>
        <div className="my-page__inner">
          <p>IP</p>
          <p>{ip}</p>
          <p>ID</p>
          <p>{user?.id}</p>
          <p>name</p>
          <p>{user?.name}</p>
          <p>description</p>
          <p>{user?.description}</p>
        </div>
      </div>
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
  .my-page__contents {
  }
  .my-page__inner {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 36px;
  }
`

export default MyPage

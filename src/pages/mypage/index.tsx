import React, { useCallback, VFC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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
          <Link to="/mypage/edit">編集</Link>
        </div>
        <div className="my-page__inner">
          <div className="my-page__row">
            <p>IP</p>
            <p>{ip}</p>
          </div>
          <div className="my-page__row">
            <p>ID</p>
            <p>{user?.id}</p>
          </div>
          <div className="my-page__row">
            <p>name</p>
            <p>{user?.name}</p>
          </div>
          <div className="my-page__row">
            <p>description</p>
            <p>{user?.description}</p>
          </div>
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
    padding: 32px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 25px rgba(77, 77, 99, 0.1);
  }
  .my-page__inner {
  }
  .mypage__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
  }
  .my-page__row {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 12px 0;
    border-bottom: 1px solid #d8e0e3;
    > p {
      word-break: break-all;
    }
    @media (max-width: 468px) {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }
`

export default MyPage

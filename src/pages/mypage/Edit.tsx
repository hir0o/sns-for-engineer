import React, { useCallback, useState, VFC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import useLocalStorage from '../../hooks/useLocalStorage'
import { SingleUser } from '../../types'

const Edit: VFC = () => {
  const history = useHistory()
  const [user, setUser] = useLocalStorage<SingleUser>('123user')
  const [name, setName] = useState(user?.name ?? '')
  const [description, setDescription] = useState(user?.description ?? '')

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
    history.push('/mypage')
  }, [name, description])
  return (
    <StyledEdit>
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
    </StyledEdit>
  )
}

const StyledEdit = styled.div``

export default Edit

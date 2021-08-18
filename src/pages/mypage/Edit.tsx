import React, { VFC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import useLocalStorage from '../../hooks/useLocalStorage'
import { SingleUser } from '../../types'

type FormValues = {
  name: string
  description: string
}

const Edit: VFC = () => {
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const [user, setUser] = useLocalStorage<SingleUser>('123user')

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { id } = await fetch(
        'https://versatileapi.herokuapp.com/api/user/create_user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      ).then((res) => res.json())
      setUser({ ...data, id })
      history.push('/mypage')
    } catch (e) {
      alert('ユーザー情報の更新ができませんでした。')
    }
  }

  return (
    <StyledEdit>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          defaultValue={user?.name ?? ''}
          {...register('name')}
        />
        <input
          type="text"
          defaultValue={user?.description ?? ''}
          {...register('description')}
        />
        <input type="submit" />
      </form>
    </StyledEdit>
  )
}

const StyledEdit = styled.div``

export default Edit

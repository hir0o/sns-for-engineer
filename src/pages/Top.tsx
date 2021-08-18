import React, { useState, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Feed from '../components/Feed'
import { useFetch } from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'
import { post } from '../lib/post'
import { Post, SingleUser } from '../types'

type FormValues = {
  text: string
}

const Top: VFC = () => {
  const { data, error, isValidating } = useFetch<Post[]>(
    'https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=50'
  )

  const { register, handleSubmit, setValue } = useForm()
  const [isSending, SetIsSending] = useState(false)
  const [user, _] = useLocalStorage<SingleUser>('123user')

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    SetIsSending(true)
    try {
      await post<{ id: string }>(
        'https://versatileapi.herokuapp.com/api/text',
        data
      )
      setValue('text', '')
    } catch (e) {
      alert('送信に失敗しました。')
    }
    SetIsSending(false)
  }

  return (
    <StyledTop>
      <form onSubmit={handleSubmit(onSubmit)} className="top__form">
        <textarea
          className="top__textarea"
          id="text"
          {...register('text')}
          placeholder="今何してる？"
        />
        <div className="button__container">
          <button>送信</button>
        </div>
      </form>
      <Feed data={data} isValidating={isValidating} />
    </StyledTop>
  )
}

const StyledTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  .top__form {
    box-shadow: 0 3px 25px rgba(77, 77, 99, 0.1);
    padding: 16px;
    border-radius: 5px;
    background-color: #fff;
  }
  .top__textarea {
    padding: 8px;
    width: 100%;
    border: 1px solid #f2f5f9;
  }
  .button__container {
    display: flex;
    justify-content: flex-end;
    > button {
      background-color: #111;
      font-size: 13px;
      padding: 3px 12px;
      color: #fff;
    }
  }
`

export default Top

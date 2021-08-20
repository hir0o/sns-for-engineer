import React, { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useSWRInfinite } from 'swr'
import Feed from '../components/Feed'
import { post } from '../lib/post'
import { Post } from '../types'
import { fetcher } from '../hooks/useFetch'

type FormValues = {
  text: string
}

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null
  return `https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$skip=${
    pageIndex * 20
  }&$limit=${20}`
}

const Top: VFC = () => {
  const { data, size, setSize } = useSWRInfinite<Post[]>(getKey, fetcher)
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await post<{ id: string }>(
        'https://versatileapi.herokuapp.com/api/text',
        data
      )
      setValue('text', '')
    } catch (e) {
      alert('送信に失敗しました。')
    }
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
        <div className="top__button-container">
          <button>送信</button>
        </div>
      </form>
      {data?.map((d) => (
        <Feed data={d} isValidating={true} key={d[0].id + 'data'} />
      ))}
      <button
        onClick={() => {
          console.log({ size })

          setSize(size + 1)
        }}
      >
        もっと読み込む
      </button>
    </StyledTop>
  )
}

const StyledTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding-bottom: 32px;
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
    background-color: #f2f5f9;
  }
  .top__button-container {
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

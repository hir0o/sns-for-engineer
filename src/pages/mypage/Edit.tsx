import React, { VFC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import useLocalStorage from '../../hooks/useLocalStorage'
import { SingleUser } from '../../types'
import MyPageContents from '../../components/MyPageContents'
import { useState } from 'react'
import loading from '../../assets/img/loading.svg'

type FormValues = {
  name: string
  description: string
}

const Edit: VFC = () => {
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const [user, setUser] = useLocalStorage<SingleUser>('123user')
  const [isSending, SetIsSending] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    SetIsSending(true)
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
    SetIsSending(false)
  }

  return (
    <StyledEdit>
      <MyPageContents>
        <form onSubmit={handleSubmit(onSubmit)} className="edit__form">
          <div className="edit__form-group">
            <label htmlFor="nane">ユーザー名</label>
            <input
              type="text"
              id="name"
              defaultValue={user?.name ?? ''}
              {...register('name')}
            />
          </div>
          <div className="edit__form-group">
            <label htmlFor="description">自己紹介</label>
            <textarea
              id="description"
              defaultValue={user?.description ?? ''}
              {...register('description')}
            />
          </div>
          <button className={`edit__form-submit ${isSending && 'sending'}`}>
            <img src={loading} alt="" />
            <p>送信</p>
          </button>
        </form>
      </MyPageContents>
    </StyledEdit>
  )
}

const StyledEdit = styled.div`
  .edit__form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    justify-items: center;
  }
  .edit__form-submit {
    margin-top: 16px;
    width: 100px;
    background-color: #111111;
    color: #fff;
    font-size: 1.1rem;
    padding: 0.5em 1.2em;
    position: relative;
    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    > p {
      opacity: 1;
    }
    &.sending {
      > img {
        opacity: 1;
      }
      > p {
        opacity: 0;
      }
    }
  }
  .edit__form-group {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    > input,
    textarea {
      width: 100%;
      display: block;
      -webkit-appearance: none;
      border-radius: 6px;
      background: #f2f5f9;
      border: 1px solid #dbe5ee;
      padding: 0.6em 0 0.6em 0.7em;
      margin-top: 8px;
    }
  }
`

export default Edit

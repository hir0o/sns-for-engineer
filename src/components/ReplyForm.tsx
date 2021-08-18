import React, { useState, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import close from '../assets/img/close.svg'
import loading from '../assets/img/loading.svg'
import { post } from '../lib/post'

type Props = {
  closeUp: () => void
  id: string
}

type FormValues = {
  text: string
}

const ReplyFOrm: VFC<Props> = ({ closeUp, id }) => {
  const { register, handleSubmit, setValue } = useForm()
  const [isSending, SetIsSending] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    SetIsSending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      await post<{ id: string }>(
        'https://versatileapi.herokuapp.com/api/text',
        { ...data, in_reply_to_text_id: id }
      )

      setValue('text', '')
    } catch (e) {
      alert('送信に失敗しました。')
    }
    SetIsSending(false)
    closeUp()
  }

  return (
    <StyledReplyForm>
      <button onClick={() => closeUp()} className="reply__close-button">
        <img src={close} alt="閉じる" />
      </button>
      <form className="reply__form" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          cols={30}
          rows={3}
          className="reply__textarea"
          placeholder="返信を入力"
          {...register('text')}
        />
        <div className="reply__button-container">
          <button className={`reply__submit-button ${isSending && 'sending'}`}>
            <img src={loading} alt="" />
            <p>送信</p>
          </button>
        </div>
      </form>
    </StyledReplyForm>
  )
}

const StyledReplyForm = styled.div`
  box-shadow: 0 3px 25px rgba(77, 77, 99, 0.1);
  padding: 32px 16px 16px;
  border-radius: 5px;
  position: relative;
  .reply__close-button {
    position: absolute;
    top: 8px;
    right: 16px;
    > img {
      width: 16px;
      height: 16px;
    }
  }
  .reply__textarea {
    padding: 8px;
    width: 100%;
  }
  .reply__button-container {
    text-align: right;
  }
  .reply__submit-button {
    margin-top: 8px;
    background-color: #111111;
    color: #fff;
    font-size: 13px;
    padding: 3px 12px;
    position: relative;
    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    > p {
      opacity: 1;
      font-size: 12px;
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
`

export default ReplyFOrm

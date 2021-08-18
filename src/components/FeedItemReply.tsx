import React, { VFC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import { Post } from '../types'
import FeedItem from './FeedItem'
import close from '../assets/img/close.svg'

type Props = {
  replyId: string
}

const FeedItemReply: VFC<Props> = ({ replyId }) => {
  const { data } = useFetch<Post>(
    `https://versatileapi.herokuapp.com/api/text/${replyId}`
  )

  const [modalOpen, setModalOpen] = useState(false)

  if (!data) return null

  return (
    <>
      <StyledFeedItemReply
        onClick={() => {
          setModalOpen(true)
        }}
      >
        <p className="feed-item-reply__text">{data.text}</p>
      </StyledFeedItemReply>
      {modalOpen && (
        <StyledModal>
          <div className="feed-item-reply__modal">
            <div className="feed-item-reply__modal-inner">
              <button onClick={() => setModalOpen(false)}>
                <img src={close} alt="閉じる" />
              </button>
              <FeedItem {...data} modal />
            </div>
          </div>
        </StyledModal>
      )}
    </>
  )
}

const StyledFeedItemReply = styled.div`
  width: 100%;
  padding-left: 16px;
  font-size: 12px;
  position: relative;
  margin-top: 12px;
  margin-bottom: 12px;
  .feed-item-reply__text {
    color: #b5bfc6;
  }
  &:before {
    content: '';
    display: block;
    width: 2px;
    height: 120%;
    background-color: #b5bfc6;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
  }
`

const StyledModal = styled.div`
  .feed-item-reply__modal {
    position: absolute;
    z-index: 100;
    top: 55px;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #b5bfc6;
    padding: 16px;
    & .feed-item-reply__modal {
      width: calc(100% + 36px);
      left: -16px;
      right: -16px;
    }
  }
  .feed-item-reply__modal-inner {
    position: relative;
    > button {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 9999;
      background-color: transparent;
      > img {
        width: 15px;
      }
    }
  }
`

export default FeedItemReply

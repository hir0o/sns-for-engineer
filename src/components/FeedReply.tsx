import React, { VFC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import { Post } from '../types'
import FeedModal from './FeedModal'

type Props = {
  replyId: string
}

const FeedReply: VFC<Props> = ({ replyId }) => {
  const { data } = useFetch<Post>(
    `https://versatileapi.herokuapp.com/api/text/${replyId}`
  )

  const [modalOpen, setModalOpen] = useState(false)

  if (!data) return null

  return (
    <>
      <StyledFeedReply
        onClick={() => {
          setModalOpen(true)
        }}
      >
        <p className="feed-reply__text">{data.text}</p>
      </StyledFeedReply>
      {modalOpen && <FeedModal setModalOpen={setModalOpen} data={data} />}
    </>
  )
}

const StyledFeedReply = styled.button`
  width: 100%;
  background-color: transparent;
  text-align: left;
  display: block;
  padding-left: 16px;
  font-size: 12px;
  position: relative;
  margin-top: 12px;
  margin-bottom: 12px;
  .feed-reply__text {
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

export default FeedReply

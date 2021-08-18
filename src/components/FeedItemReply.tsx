import React, { VFC } from 'react'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import { Post } from '../types'

type Props = {
  replyId: string
}

const FeedItemReply: VFC<Props> = ({ replyId }) => {
  const { data } = useFetch<Post>(
    `https://versatileapi.herokuapp.com/api/text/${replyId}`
  )
  return <StyledFeedItemReply>{data?.text}</StyledFeedItemReply>
}

const StyledFeedItemReply = styled.div`
  color: #b5bfc6;
  padding-left: 16px;
  font-size: 12px;
  position: relative;
  margin-top: 12px;
  margin-bottom: 12px;
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

export default FeedItemReply

import React, { VFC } from 'react'
import styled from 'styled-components'
import replaceToHtml from '../lib/replacer'
import { Post } from '../types'

type Prps = Pick<Post, 'id' | 'text'>

const FeedItem: VFC<Prps> = ({ id, text }) => {
  return (
    <StyledFeedItem>
      <div className="feed-item__user-img"></div>
      <div className="feed-item__content">
        <div
          className="feed-item__text"
          dangerouslySetInnerHTML={{
            __html: replaceToHtml(text),
          }}
        />
      </div>
    </StyledFeedItem>
  )
}

const StyledFeedItem = styled.div`
  display: flex;
`

export default FeedItem

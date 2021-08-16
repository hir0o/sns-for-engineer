import React, { VFC } from 'react'
import styled from 'styled-components'
import replaceToHtml from '../lib/replacer'
import { toSvg } from 'jdenticon'
import { Post, User } from '../types'
import { useFetch } from '../hooks/useFetch'

type Prps = Pick<Post, 'id' | 'text' | '_user_id'>

const FeedItem: VFC<Prps> = ({ id, text, _user_id }) => {
  //   const { data, error, isValidating } = useFetch<User>(
  //     `https://versatileapi.herokuapp.com/api/user/${_user_id}`
  //   )
  return (
    <StyledFeedItem>
      <div
        className="feed-item__user-img"
        dangerouslySetInnerHTML={{
          __html: toSvg(_user_id, 40),
        }}
      ></div>
      <div className="feed-item__content">
        {/* <div className="feed-item__user">{data ? data.name : '未登録'}</div> */}
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
  .feed-item__user-img {
    > svg {
      border-radius: 5px;
      border: 1px solid #3e3e3e;
    }
  }
`

export default FeedItem

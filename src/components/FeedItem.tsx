import React, { VFC } from 'react'
import styled from 'styled-components'
import replaceToHtml from '../lib/replacer'
import { toSvg } from 'jdenticon'
import { Post, User } from '../types'
import { useContext } from 'react'
import { UsersContext } from '../App'
import { useState } from 'react'
import { useEffect } from 'react'

type Prps = Pick<Post, 'id' | 'text' | '_user_id'>
type SingleUser = Pick<User, 'name' | 'description'>

const FeedItem: VFC<Prps> = ({ id, text, _user_id }) => {
  const users = useContext(UsersContext)
  const [user, setUser] = useState<SingleUser>({} as SingleUser)

  useEffect(() => {
    setUser(users[_user_id])
  }, [])

  return (
    <StyledFeedItem>
      <div className="feed-item__header">
        <div
          className="feed-item__user-img"
          dangerouslySetInnerHTML={{
            __html: toSvg(_user_id, 40),
          }}
        />
        <div className="feed-item__user">
          <p className="feed-item__user-name">{user ? user.name : '未登録'}</p>
          <p className="feed-item__time">3分前</p>
        </div>
      </div>
      <div className="feed-item__content">
        <div className="feed-item__content-space" />
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
  padding-bottom: 12px;
  border-bottom: 1px solid #d8e0e3;
  .feed-item__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .feed-item__user-img {
    > svg {
      border-radius: 5px;
      border: 1px solid #3e3e3e;
    }
  }
  .feed-item__user {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - (16px + 40px));
  }
  .feed-item__user-name {
    font-weight: 600;
  }
  .feed-item__time {
    color: #5e5e5e;
    font-size: 12px;
  }
  .feed-item__content {
    display: flex;
    justify-content: space-around;
  }
  .feed-item__content-space {
    width: calc(16px + 40px);
  }
  .feed-item__text {
    width: 100%;
    margin-top: 12px;
  }
`

export default FeedItem

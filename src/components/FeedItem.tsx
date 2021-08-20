import React, { VFC, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Post } from '../types'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import ProfileImage from './ProfileImage'
import FeedItemReply from './FeedReply'
import ReplyForm from './ReplyForm'
import dayjs from 'dayjs'
import { getOffsetString } from '../lib/offsetString'
import { useMemo } from 'react'
import replaceToHtml from '../lib/replacer'

type Prps = Post & {
  modal?: boolean
}

const FeedItem: VFC<Prps> = ({
  id,
  text,
  _user_id,
  in_reply_to_text_id,
  _created_at,
  modal = false,
}) => {
  const user = useUser(_user_id)
  const [isReply, setIsReply] = useState(false)
  const offsetString = useMemo(() => {
    return getOffsetString(new Date(), new Date(dayjs(_created_at).toDate()))
  }, [])

  return (
    <StyledFeedItem id={id} className={modal ? 'feed-item--modal' : ''}>
      <div className="feed-item__header">
        <ProfileImage
          className="feed-item__user-img"
          userId={_user_id}
          size={40}
        />
        <div className="feed-item__user">
          <p className="feed-item__user-name">
            {user ? (
              <Link to={`/users/${_user_id}`}>{user.name}</Link>
            ) : (
              '未登録'
            )}
          </p>
          <p className="feed-item__time">{offsetString}</p>
        </div>
      </div>
      <div className="feed-item__content">
        <div className="feed-item__text">
          {in_reply_to_text_id && (
            <FeedItemReply replyId={in_reply_to_text_id} />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: replaceToHtml(text),
            }}
          />
          {!modal && !isReply && (
            <div>
              <button
                className="feed-item__reply-button"
                onClick={() => setIsReply(true)}
              >
                返信
              </button>
            </div>
          )}
          {isReply && <ReplyForm closeUp={() => setIsReply(false)} id={id} />}
        </div>
      </div>
    </StyledFeedItem>
  )
}

const StyledFeedItem = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #d8e0e3;
  position: relative;
  &.feed-item--modal {
    border: none;
  }
  .feed-item__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .feed-item__user-img {
    > svg {
      border-radius: 5px;
      border: 1px solid #d8e0e3;
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
    word-break: break-all;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .feed-item__reply-button {
    background-color: transparent;
    color: #5e5e5e;
  }
`

export default FeedItem

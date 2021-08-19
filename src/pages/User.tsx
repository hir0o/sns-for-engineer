import React, { VFC } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Feed from '../components/Feed'
import { useFetch } from '../hooks/useFetch'
import { useUser } from '../hooks/useUser'
import { Post } from '../types'
import replaceToHtml from '../lib/replacer'
import ProfileImage from '../components/ProfileImage'

const User: VFC = () => {
  const { userId } = useParams<{ userId: string }>()
  const user = useUser(userId)
  const { data, isValidating } = useFetch<Post[]>(
    `https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$filter=_user_id eq '${userId}'`
  )

  if (!user) return <h1>Userが見つかりませんでした。</h1>

  return (
    <StyledUser>
      <div className="user__header">
        <ProfileImage className="user__img" userId={userId} size={120} />
        <div className="user__text">
          <h2>{user.name}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: replaceToHtml(user.description ?? ''),
            }}
          />
        </div>
      </div>
      <div className="user__body">
        <Feed data={data} isValidating={isValidating} />
      </div>
    </StyledUser>
  )
}

const StyledUser = styled.div`
  .user__header {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 16px;
    @media (max-width: 468px) {
      grid-template-columns: 1fr;
    }
  }
  .user__img {
    text-align: center;
    > svg {
      border-radius: 5px;
      border: 1px solid #d8e0e3;
    }
  }
  .user__text {
    > p {
      margin-top: 16px;
    }
  }
  .user__body {
    padding-top: 36px;
  }
`

export default User

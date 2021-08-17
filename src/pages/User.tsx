import React, { VFC } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Feed from '../components/Feed'
import { useFetch } from '../hooks/useFetch'
import { useUser } from '../hooks/useUser'
import { Post } from '../types'

const User: VFC = () => {
  const { userId } = useParams<{ userId: string }>()
  const user = useUser(userId)
  const { data, isValidating } = useFetch<Post[]>(
    `https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$filter=_user_id eq '${userId}'`
  )

  if (!user) return <h1>Userが見つかりませんでした。</h1>

  return (
    <StyledUser>
      <h1>name: {user?.name}</h1>
      <h1>desc: {user?.description}</h1>
      <Feed data={data} isValidating={isValidating} />
    </StyledUser>
  )
}

const StyledUser = styled.div``

export default User

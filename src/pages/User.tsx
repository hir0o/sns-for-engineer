import React, { VFC } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { useUser } from '../hooks/useUser'

const User: VFC = () => {
  const { userId } = useParams<{ userId: string }>()
  const user = useUser(userId)

  return (
    <StyledUser>
      <h1>id: {user?.name}</h1>
    </StyledUser>
  )
}

const StyledUser = styled.div``

export default User

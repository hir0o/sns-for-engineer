import React, { VFC } from 'react'
import styled from 'styled-components'
import useIp from '../hooks/useIp'

const MyPage: VFC = () => {
  const ip = useIp()

  return (
    <StyledMyPage>
      <p>mypage</p>
      <h1>IP: {ip}</h1>
    </StyledMyPage>
  )
}

const StyledMyPage = styled.div`
  display: block;
`

export default MyPage

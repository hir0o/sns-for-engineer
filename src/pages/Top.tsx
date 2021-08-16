import React, { VFC } from 'react'
import styled from 'styled-components'
import Feed from '../components/Feed'

const Top: VFC = () => {
  return (
    <StyledTop>
      <Feed />
    </StyledTop>
  )
}

const StyledTop = styled.div`
  display: block;
`

export default Top

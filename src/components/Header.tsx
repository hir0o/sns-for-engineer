import React, { VFC } from 'react'
import styled from 'styled-components'
import ContentContainer from './ContentContainer'

const Header: VFC = () => {
  return (
    <StyledHeader>
      <ContentContainer className="header__inner">
        <h1>SNS for Engenner</h1>
        <a href="#">user</a>
      </ContentContainer>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  .header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  box-shadow: 0 3px 25px rgba(77, 77, 99, 0.1);
`

export default Header

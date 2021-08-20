import React, { VFC } from 'react'
import styled from 'styled-components'
import ContentContainer from './ContentContainer'
import { Link } from 'react-router-dom'

const Header: VFC = () => {
  return (
    <StyledHeader>
      <ContentContainer className="header__inner">
        <h1>
          <Link to="/">SNS for Engenner</Link>
        </h1>
        <Link to="/mypage">mypage</Link>
      </ContentContainer>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  box-shadow: 0 3px 25px rgba(77, 77, 99, 0.1);
  background-color: #fff;
  .header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export default Header

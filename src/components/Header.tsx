import React, { VFC } from 'react'
import styled from 'styled-components'
import ContentContainer from './ContentContainer'
import { Link } from 'react-router-dom'
import ProfileImage from "../components/ProfileImage"
import useLocalStrage from "../hooks/useLocalStorage"
import { User } from "../types"

const Header: VFC = () => {
  const [user, _] = useLocalStrage<User>("123user")

  return (
    <StyledHeader>
      <ContentContainer className="header__inner">
        <h1 className="header__title">
          <Link to="/">SNS for Engenner</Link>
        </h1>
        <Link to="/mypage">
          {user && <ProfileImage userId={user.id} size={30} />}
        </Link>
      </ContentContainer>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  box-shadow: 0 3px 25px rgba(77, 77, 99, 0.1);
  background-color: #fff;
  padding: 12px 0;
  .header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header__title {
    font-size: 16px;
  }
`

export default Header

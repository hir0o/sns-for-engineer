import React, { VFC } from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  text?: string
  children?: ReactNode
}

const MyPageRow: VFC<Props> = ({ title, text, children }) => {
  return (
    <StyledMyPageRow>
      <div className="my-page__row">
        <p>{title}</p>
        {children ?? <p>{text}</p>}
      </div>
    </StyledMyPageRow>
  )
}

const StyledMyPageRow = styled.div``

export default MyPageRow

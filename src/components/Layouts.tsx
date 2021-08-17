import React, { ReactNode, FC } from 'react'
import styled from 'styled-components'
import ContentContainer from './ContentContainer'

type Props = {
  children: ReactNode
}

const Layouts: FC<Props> = ({ children }) => (
    <StyledLayouts>
      <ContentContainer>{children}</ContentContainer>
    </StyledLayouts>
  )

const StyledLayouts = styled.div`
  padding-top: 32px;
`

export default Layouts

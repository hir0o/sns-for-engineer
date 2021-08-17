import React, { VFC } from 'react'
import styled from 'styled-components'
import Feed from '../components/Feed'
import { useFetch } from '../hooks/useFetch'
import { Post } from '../types'

const Top: VFC = () => {
  const { data, error, isValidating } = useFetch<Post[]>(
    'https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=20'
  )

  return (
    <StyledTop>
      <Feed data={data} isValidating={isValidating} />
    </StyledTop>
  )
}

const StyledTop = styled.div`
  display: block;
`

export default Top

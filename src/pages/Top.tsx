import { VFC } from 'react'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import { Post } from '../types'
import Feed from '../components/Feed'

const Top: VFC = () => {
  const { data, isValidating } = useFetch<Post[]>(
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

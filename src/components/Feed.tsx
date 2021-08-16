import React, { VFC } from 'react'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import { Post } from '../types'
import FeedItem from './FeedItem'

const Feed: VFC = () => {
  const { data, error, isValidating } = useFetch<Post[]>(
    'https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=20'
  )

  if (!data) {
    if (isValidating) return <p>Loading</p>
    return <p>Feedを取得できませんでした。</p>
  }

  return (
    <StyledFeed>
      {data.map(({ text, id, _user_id }) => (
        <FeedItem text={text} id={id} _user_id={_user_id} key={id} />
      ))}
    </StyledFeed>
  )
}

const StyledFeed = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
`

export default Feed

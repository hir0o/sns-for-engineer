import React, { VFC } from 'react'
import styled from 'styled-components'
import { Post } from '../types'
import FeedItem from './FeedItem'

type Props = {
  data: Post[] | undefined
  isValidating: boolean
}

const Feed: VFC<Props> = ({ data, isValidating }) => {
  if (!data) {
    if (isValidating) return <p>Loading</p>
    return <p>Feedを取得できませんでした。</p>
  }

  if (data.length === 0) return <p>投稿はまだありません。</p>

  return (
    <StyledFeed>
      {data.map((d) => (
        <FeedItem {...d} key={d.id} />
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

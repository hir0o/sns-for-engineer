import { VFC } from 'react'
import styled from 'styled-components'
import FeedItem from './FeedItem'
import { Post } from '../types'

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

import React, { VFC } from 'react'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import replaceToHtml from '../lib/replacer'
// import sanitizeHtml from 'sanitize-html'

type Data = {
  text: string
}[]

const Feed: VFC = () => {
  const { data, error, isValidating } = useFetch<Data>(
    'https://versatileapi.herokuapp.com/api/text/all?$orderby=_created_at desc&$limit=20'
  )

  if (!data) {
    if (isValidating) return <p>Loading</p>
    return <p>Feedを取得できませんでした。</p>
  }
  return (
    <StyledFeed>
      {data.map((item) => (
        <div
          dangerouslySetInnerHTML={{
            __html: replaceToHtml(item.text),
          }}
        />
      ))}
    </StyledFeed>
  )
}

const StyledFeed = styled.div`
  display: block;
`

export default Feed

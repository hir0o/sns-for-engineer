import React, { VFC } from 'react'
import MyPageContents from '../../components/MyPageContents'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useIp from '../../hooks/useIp'
import useLocalStorage from '../../hooks/useLocalStorage'
import { User } from '../../types'
import replaceToHtml from '../../lib/replacer'
import MyPageRow from '../../components/MyPageRow'

type SingleUser = Pick<User, 'name' | 'description' | 'id'>

const MyPage: VFC = () => {
  const ip = useIp()

  const [user, _] = useLocalStorage<SingleUser>('123user')

  return (
    <StyledMyPage>
      <MyPageContents>
        <div className="mypage__header">
          <h2>ユーザー情報</h2>
          <Link to="/mypage/edit">編集</Link>
        </div>
        <div className="my-page__inner">
          <MyPageRow title="IP" text={ip} />
          <MyPageRow title="ID" text={user?.id} />
          <MyPageRow title="ユーザー名" text={user?.name} />
          <MyPageRow title="自己紹介" text={user?.name}>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceToHtml(user?.description ?? ''),
              }}
            />
          </MyPageRow>
        </div>
      </MyPageContents>
    </StyledMyPage>
  )
}

const StyledMyPage = styled.div`
  .my-page__inner {
  }
  .mypage__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
  }
  .my-page__row {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 12px 0;
    border-bottom: 1px solid #d8e0e3;
    > p {
      word-break: break-all;
    }
    @media (max-width: 468px) {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }
`

export default MyPage

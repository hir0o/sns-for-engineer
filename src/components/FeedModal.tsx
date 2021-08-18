import React, { VFC } from 'react'
import styled from 'styled-components'
import { Post } from '../types'
import FeedItem from './FeedItem'
import close from '../assets/img/close.svg'

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: Post
}

const FeedModal: VFC<Props> = ({ setModalOpen, data }) => {
  return (
    <StyledFeedModal>
      <div className="feed-modal__modal">
        <div className="feed-modal__modal-inner">
          <button onClick={() => setModalOpen(false)}>
            <img src={close} alt="閉じる" />
          </button>
          <FeedItem {...data} modal />
        </div>
      </div>
    </StyledFeedModal>
  )
}

const StyledFeedModal = styled.div`
  .feed-modal__modal {
    position: absolute;
    z-index: 100;
    top: 55px;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #b5bfc6;
    padding: 16px;
    & & {
      width: calc(100% + 36px);
      left: -16px;
      right: -16px;
    }
  }
  .feed-modal__modal-inner {
    position: relative;
    > button {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 9999;
      background-color: transparent;
      > img {
        width: 15px;
      }
    }
  }
`

export default FeedModal

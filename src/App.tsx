import React, { VFC } from 'react'
import Header from './components/Header'
import Feed from './components/Feed'
import './grobal.css'
import ContentContainer from './components/ContentContainer'

const App: VFC = () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <Feed />
      </ContentContainer>
    </>
  )
}

export default App

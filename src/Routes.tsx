import React, { VFC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Top from './pages/Top'
import MyPage from './pages/MyPage'

const Routes: VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Top />
      </Route>
      <Route path="/mypage">
        <MyPage />
      </Route>
    </Switch>
  )
}

export default Routes

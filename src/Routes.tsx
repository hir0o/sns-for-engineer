import React, { VFC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Top from './pages/Top'
import MyPage from './pages/MyPage'

const Routes: VFC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <Route path="/">
          <Top />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes

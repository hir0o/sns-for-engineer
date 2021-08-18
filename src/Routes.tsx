import React, { VFC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Top from './pages/Top'
import MyPage from './pages/mypage'
import User from './pages/User'
import Edit from './pages/mypage/Edit'

const Routes: VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Top />
      </Route>
      <Route exact path="/mypage">
        <MyPage />
      </Route>
      <Route exact path="/mypage/edit">
        <Edit />
      </Route>
      <Route path="/users/:userId">
        <User />
      </Route>
    </Switch>
  )
}

export default Routes

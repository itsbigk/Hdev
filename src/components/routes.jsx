import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Main from '../components/Main/Main'
import Home from '../components/Home/Home'
import Profile from '../components/Profile/Profile'
import NotFound from '../components/NotFound/NotFound'

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="home" component={Home} />
      <Route path="profile" component={Profile} />
      // @TODO: make login route
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

export default routes

import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Main from '../components/Main/Main'
import Home from '../containers/App'
import Profile from '../components/Profile/Profile'
import NotFound from '../components/NotFound/NotFound'

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="profile" component={Profile} />
      // @TODO: make login route
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

export default routes

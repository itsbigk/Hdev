import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { Main, Profile, NotFound } from '../src/components'
import { Home } from '../src/containers'

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

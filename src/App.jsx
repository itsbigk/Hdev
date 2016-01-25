import React from 'react'
import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import routes from './config/routes'
import AppActions from './actions/appActionCreators'

// AppActions.appInit()

// @TODO begin action for app init to make sure the components have the latest content
// the stores will pick on the dispatch from the action if they have a case in the switch

render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'))

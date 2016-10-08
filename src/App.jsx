import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { routes, configureStore } from '../shared'

const initialState = window.__INITIAL_STATE__ || {},
      store = configureStore(initialState),
      rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  rootElement
)

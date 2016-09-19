import React from 'react'
import { Link } from 'react-router'

process.env.BROWSER ? require('./style') : null

const NotFound = props => (
  <div className="not-found">
    <h1>Whoops...</h1>
    <p>We cannot find the page you requested.</p>
    <Link to="/">Return to home</Link>
  </div>
)

export default NotFound

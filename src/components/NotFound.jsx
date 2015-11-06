import React from 'react'
import { Link } from 'react-router'

class NotFound extends React.Component {
  render() {
    return (
      <div id="not-found">
        <h1>Whoops...</h1>
        <p>We cannot find the page you requested.</p>
        <Link to="home">Return to home</Link>
      </div>
    )
  }
}

export default NotFound

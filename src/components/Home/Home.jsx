import React from 'react'
import Display from '../Display'

process.env.BROWSER ? require('./style') : null


class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Display if={false}>
          <h3>Log in:</h3>
          <input placeholder="Email" />
          <input placeholder="Password" />
          <button>Submit</button>
        </Display>
        <Display if={true}>
          <h1>Logged in</h1>
        </Display>
      </div>
    )
  }
}

export default Home

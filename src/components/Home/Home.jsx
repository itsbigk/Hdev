import React from 'react'
import Display from '../Display'

process.env.BROWSER ? require('./style') : null


class Home extends React.Component {
  render() {
    let { employee } = this.props
    return (
      <div className="home">
        { !employee.loggedIn &&
          <div>
            <h3>Log in:</h3>
            <input placeholder="Email" />
            <input placeholder="Password" />
            <button>Submit</button>
          </div>
        }

        {
          employee.loggedIn &&
          <h1>Logged in!</h1>
        }
      </div>
    )
  }
}

export default Home

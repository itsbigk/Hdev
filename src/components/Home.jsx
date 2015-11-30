import React from 'react'
import { findDOMNode } from 'react-dom'
import employeeActions from '../actions/employeeActionCreators'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this._login = this._login.bind(this)
    // this.props.history.replaceState(null, '/home')
  }

  render() {
    return (
      <div>
        <h1>Working app</h1>
        <h2>Log in:</h2>
        <input ref="email" placeholder="Enter email" />
        <input ref="password" placeholder="Enter password" />
        <button onClick={this._login}>Submit</button>
      </div>
    )
  }

  _login() {
    console.log(this.refs.email)
    // if(this.refs.email && this.refs.password) {
    //   employeeActions.login({
    //     email: this.refs.email,
    //     password: this.refs.password
    //   })
    // }
  }
}

export default Home

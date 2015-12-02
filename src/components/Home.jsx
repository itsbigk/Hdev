import React from 'react'
import employeeActions from '../actions/employeeActionCreators'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this._login = this._login.bind(this)
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

  componentWillMount() {
    console.log('working')
  }

  _login() {
    console.log(this.refs)
    // if(this.refs.email && this.refs.password) {
    //   employeeActions.login({
    //     email: this.refs.email,
    //     password: this.refs.password
    //   })
    // }
  }
}

export default Home

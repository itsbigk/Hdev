import React from 'react'
import employeeActions from '../actions/employeeActionCreators'
import EmployeeStore from '../stores/employeeStore'
import Display from './Display'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this._login = this._login.bind(this)
    this.state = EmployeeStore.getState()
  }

  render() {
    return (
      <div>
        <h1>Working app</h1>
        <Display if={!this.state.currentEmployee}>
          <h2>Log in:</h2>
          <input ref="email" placeholder="Enter email" />
          <input ref="password" placeholder="Enter password" />
          <button onClick={this._login}>Submit</button>
        </Display>
        <Display if={this.state.currentEmployee}>
          <h1>Logged in {this.state.currentEmployee}</h1>
        </Display>
      </div>
    )
  }

  componentWillMount() {
    console.log('working')
    EmployeeStore.addChangeListener(() => {
      this.setState(EmployeeStore.getState())
      console.log(this.state)
    })
  }

  componentWillUnmount() {
    EmployeeStore.removeChangeListener()
  }

  _login() {
    if(this.refs.email && this.refs.password) {
      employeeActions.login({
        email: this.refs.email.value,
        password: this.refs.password.value
      })
    }
  }
}

export default Home

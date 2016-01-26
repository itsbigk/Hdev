import React from 'react'
import employeeActions from '../../actions/employeeActionCreators'
import employeeStore from '../../stores/employeeStore'
import Display from '../Helpers/Display'

if(process.env.BROWSER) {
  require('./style.scss')
}


class Home extends React.Component {
  constructor(props) {
    super(props)
    this._login = this._login.bind(this)
    this._onChange = this._onChange.bind(this)
    this.state = employeeStore.getState()
  }

  render() {
    return (
      <div className="home">
        <Display if={!this.state.currentEmployee}>
          <h3>Log in:</h3>
          <input ref="email" placeholder="Email" />
          <input ref="password" placeholder="Password" />
          <button onClick={this._login}>Submit</button>
        </Display>
        <Display if={this.state.currentEmployee}>
          <h1>Logged in</h1>
        </Display>
      </div>
    )
  }

  componentDidMount() {
    employeeStore.addChangeListener(() => {
      this._onChange()
    })
  }

  componentWillUnmount() {
    employeeStore.removeChangeListener(() => {
      return true
    })
  }

  _login() {
    if(this.refs.email && this.refs.password) {
      employeeActions.login({
        email: this.refs.email.value,
        password: this.refs.password.value
      })
    }
  }

  _onChange() {
    this.setState(employeeStore.getState())
    console.log(this.state.currentEmployee)
  }
}

export default Home

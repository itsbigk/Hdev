import React from 'react'
import employeeActions from '../../actions/employeeActionCreators'
import EmployeeStore from '../../stores/employeeStore'
import Display from '../Helpers/Display'
import { Grid, Cell, Textfield, Button } from 'react-mdl'

if(process.env.BROWSER) {
  require('./style.less')
}


class Home extends React.Component {
  constructor(props) {
    super(props)
    this._login = this._login.bind(this)
    this._onChange = this._onChange.bind(this)
    this.state = EmployeeStore.getState()
  }

  render() {
    return (
      <div className="home">
        <Grid>
          <Cell col={12}>
            <Display if={!this.state.currentEmployee}>
              <h3>Log in:</h3>
                <Textfield
                  onChange={() => {}}
                  label="Email"
                  floatingLabel
                  style={{width: '200px'}}
                  ref="email"
                />
                <Textfield
                  onChange={() => {}}
                  label="Password"
                  floatingLabel
                  style={{width: '200px'}}
                  ref="password"
                />
              <Button ripple onClick={this._login}>Submit</Button>
            </Display>
            <Display if={this.state.currentEmployee}>
              <h1>Logged in</h1>
            </Display>
          </Cell>
        </Grid>
      </div>
    )
  }

  componentDidMount() {
    console.log('working')
    EmployeeStore.addChangeListener(() => {
      this._onChange()
    })
  }

  componentWillUnmount() {
    EmployeeStore.removeChangeListener(() => {
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
    this.setState(EmployeeStore.getState())
    console.log(this.state.currentEmployee)
  }
}

export default Home

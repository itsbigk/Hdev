import React from 'react'
import { Link } from 'react-router'

import employeeStore from '../../stores/employeeStore'

if(process.env.BROWSER) {
  require('../../scss/application')
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this.state = {
      currentEmployee: employeeStore.getCurrentEmployee()
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>yo</h1>
          { this.props.children &&
            React.cloneElement(this.props.children, {
              // pass props to children
              currentEmployee: this.state.currentEmployee
          }) }
        </div>
        {/* @TODO add footer */}
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

  _onChange() {
    this.setState({
      currentEmployee: employeeStore.getCurrentEmployee()
    })
  }
}

export default Main

import React from 'react'
import { Link } from 'react-router'
import Navbar from '../Navbar/Navbar'

if(process.env.BROWSER) {
  require('../../less/application.less')
}

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          { this.props.children &&
            React.cloneElement(this.props.children, {
            // @TODO pass current user as prop
          }) }
        </div>
        {/* @TODO add footer */}
      </div>
    )
  }
}

export default Main

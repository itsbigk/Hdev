import React from 'react'
import { Link } from 'react-router'

import Navbar from "../Navbar/Navbar"

require('../../sass/application.scss')

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <Link to="/home">Home</Link>
            <div className="container">
              { this.props.children &&
                React.cloneElement(this.props.children, {
                // @TODO pass current user as prop
              }) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main

import React from 'react'
import { Link } from 'react-router'

require('../sass/application.scss')

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {/* Add navbar */}
        <div className="container">
          <div className="row">
            <Link to="/home">Home</Link>
            <div className="container">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main

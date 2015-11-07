import React from 'react'
import { RouteHandler, Link } from 'react-router'
import UserStore from '../stores/userStore'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: UserStore.getCurrentUser()
    }
  }

  render() {
    return (
      <div>
        {/* Add navbar */}
        <Link to="/home">Home</Link>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main

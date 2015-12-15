import React from 'react'
import { Link } from 'react-router'

if(process.env.BROWSER) {
  require('./style.less')
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="navbar navbar-light">
        <div className="navbar-inner">
          <div className="container-fluid">
            <a className="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </a>
            <Link to="/" className="navbar-brand">App</Link>
            <div className="nav-collapse collapse">
              <ul className="nav nav-pills">
                <li>
                  <Link to="profile">Profile</Link>
                </li>
              </ul>
              <ul className="nav nav-pills">
                <li>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar

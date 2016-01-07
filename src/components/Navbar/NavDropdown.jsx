import React from 'react'
import { Link } from 'react-router'

import { logout } from '../../actions/employeeActionCreators'

class NavDropdown extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <ul id="employeeDropdown">
        <li><Link to="profile">Profile</Link></li>
        <li><a href="#">Something</a></li> //@TODO
        <li className="divider"></li>
        <li onClick={logout()}><a href="#">Logout</a></li>
      </ul>
    )
  }
}

export default NavDropdown

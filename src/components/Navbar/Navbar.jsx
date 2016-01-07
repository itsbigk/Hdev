import React from 'react'
import { Link } from 'react-router'

import NavDropdown from './NavDropdown'
import SideNav from './SideNav'
import Display from '../Helpers/Display'
import employeeActions from '../../actions/employeeActionCreators'
import employeeStore from '../../stores/employeeStore'

if(process.env.BROWSER) {
  require('./style.less')
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Display if={employeeActions.auth((result) => result)}>
          <NavDropdown />
        </Display>
        <nav className="cyan lighten-4">
          <div className="nav-wrapper">
            <ul className="right hide-on-med-and-down">
              <Display if={employeeActions.auth((result) => result)}>
                <li><a className="dropdown-button" href="#!" data-activates="employeeDropdown"></a></li>
              </Display>
            </ul>
          </div>
        </nav>
        <SideNav />
      </div>
    )
  }
}

export default Navbar

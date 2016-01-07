import React from 'react'
import { Link } from 'react-router'

class SideNav extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <ul id="nav-mobile" className="side-nav fixed black">
        <li className="logo"><Link to="/" className="brand-logo"><h4>App</h4></Link></li>
        <li className="bold"><Link to="home">Home</Link></li>
      </ul>
    )
  }
}

export default SideNav

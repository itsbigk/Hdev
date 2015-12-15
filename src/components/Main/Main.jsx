import React from 'react'

import Navbar from "../Navbar/Navbar"

if(process.env.BROWSER) {
  require('../../sass/application.less')
}

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div>
            { this.props.children &&
              React.cloneElement(this.props.children, {
              // @TODO pass current user as prop
            }) }
          </div>
        </div>
      </div>
    )
  }
}

export default Main

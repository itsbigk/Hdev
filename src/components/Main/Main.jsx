import React from 'react'
import { Link } from 'react-router'

process.env.BROWSER ? require('../../scss/application') : null

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>yo</h1>
        {this.props.children}
        {/* @TODO add footer */}
      </div>
    )
  }
}

export default Main

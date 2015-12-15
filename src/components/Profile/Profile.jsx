import React from 'react'

if(process.env.BROWSER) {
  require('./style.less')
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    )
  }
}

export default Profile

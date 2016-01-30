import React from 'react'

if(process.env.BROWSER) {
  require('./style')
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

import React from 'react'

process.env.BROWSER ? require('./style') : null

const Profile = props => (
  <div className="profile">
    <h1>Profile</h1>
  </div>
)

export default Profile

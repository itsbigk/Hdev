import React from 'react'
import { Link } from 'react-router'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl'

if(process.env.BROWSER) {
  require('../../less/application.less')
}

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout fixedHeader fixedDrawer>
        <Header title="App" className="navBar">

        </Header>
        <Drawer className="sideNav">
            <Navigation>
                <Link to="/">Home</Link>
                <a href="">New Device</a>
                <a href="">Device List</a>
                <a href="">Link</a>
              </Navigation>
        </Drawer>
        <div className="main">
          <div>
            { this.props.children &&
              React.cloneElement(this.props.children, {
              // @TODO pass current user as prop
            }) }
          </div>
        </div>
        {/* @TODO add footer */}
      </Layout>
    )
  }
}

export default Main

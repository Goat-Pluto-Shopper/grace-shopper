import React from 'react'

import {Navbar, Header, Footer, AllItems, SideBar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const App = props => {
  return (
    <div>
      {/* might need to put somewhere else because not all pages have header */}
      <Navbar />
      <Header />
      {/* switch happens */}
      <main>
        {props.sideBarToggle && <SideBar />}
        <div id="main-container">
          <Routes />
        </div>
        {/* <AllItems /> */}
      </main>
      {/* right here */}
      <Footer />
    </div>
  )
}

const mapState = state => {
  return {
    sideBarToggle: state.sideBarToggle
  }
}

export default withRouter(connect(mapState)(App))

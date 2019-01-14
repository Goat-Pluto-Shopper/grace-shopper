import React from 'react'

import {Navbar, Header, Footer, AllItems} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements'

const App = props => {
  return (
    <div>
      {/* might need to put somewhere else because not all pages have header */}
      <Navbar />
      <Header />
      {/* switch happens */}
      <main>
        <div id="main-container">
          <StripeProvider apiKey="pk_test_H5r5gVCevsEbSRPcy3BUjb1e">
            <Elements>
              <Routes />
            </Elements>
          </StripeProvider>
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

import React from 'react'

import {Navbar, Header, Footer} from './components'
import Routes from './routes'
import {Elements, StripeProvider} from 'react-stripe-elements'

const App = () => {
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
      </main>
      <Footer />
    </div>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {Elements, StripeProvider} from 'react-stripe-elements'

//importating css
import './styles/index.css'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_H5r5gVCevsEbSRPcy3BUjb1e">
      <Elements>
        <Router history={history}>
          <App />
        </Router>
      </Elements>
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
)

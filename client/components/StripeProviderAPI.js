import React from 'react'
import CheckoutForm from './CheckoutForm'
import {Elements, StripeProvider} from 'react-stripe-elements'

const StripeProviderAPI = props => {
  return (
    <StripeProvider apiKey="pk_test_H5r5gVCevsEbSRPcy3BUjb1e">
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  )
}

export default StripeProviderAPI

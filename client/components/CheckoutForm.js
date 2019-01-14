import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      firstName: '',
      lastName: '',
      total: '', //get from cartstate,
      streetAddress: '',
      aptNum: '',
      city: '',
      state: '',
      zipcode: ''
    }
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    console.log(ev.target)
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) {
      this.setState({complete: true})
      console.log('Purchase Complete!')
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    console.log('checkout form props', this.props)
    return (
      <form onSubmit={this.submit}>
        <input type="hidden" name="token" />
        <label>
          <label>Credit or Debit Card</label>
          <CardElement onReady={el => el.focus()} />
        </label>
        <label>
          <span>First name</span>
          <input
            id="first-name"
            name="first-name"
            placeholder="Jane"
            value={this.state.firstName}
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            id="last-name"
            name="last-name"
            placeholder="Doe"
            value={this.state.lastName}
          />
        </label>
        <label>
          <span>Street Address</span>
          <input
            id="address-line1"
            name="address_line1"
            placeholder="77 Winchester Lane"
            value={this.state.streetAddress}
          />
        </label>
        <label>
          <span>Apt Number</span>
          <input
            id="apt-num"
            name="apt-num"
            placeholder="1A"
            value={this.state.aptNum}
          />
        </label>
        <label>
          <span>City</span>
          <input
            id="address-city"
            name="address_city"
            placeholder="Coachella"
            value={this.state.city}
          />
        </label>
        <label>
          <span>State</span>
          <input
            id="address-state"
            name="address_state"
            placeholder="CA"
            value={this.state.state}
          />
        </label>
        <label>
          <span>ZIP</span>
          <input
            id="address-zip"
            name="address_zip"
            placeholder="92236"
            value={this.state.zipcode}
          />
        </label>

        <button type="submit">Pay $25</button>
        <div className="outcome">
          <div className="error" />
          <div className="success">
            Success! Your Stripe token is <span className="token" />
          </div>
        </div>
      </form>
      // <form onSubmit={this.submit}>
      //   <div className="checkout">
      //     <label>Credit or Debit Card</label>
      //     <CardElement onReady={el => el.focus()} />
      //     <button type="submit">COMPLETE PURCHASE</button>
      //   </div>
      // </form>
    )
  }
}

export default injectStripe(CheckoutForm)

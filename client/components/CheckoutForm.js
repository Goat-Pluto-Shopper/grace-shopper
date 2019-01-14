import {connect} from 'react-redux'
import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {postCart} from '../store/cart'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      firstName: 'Jane',
      lastName: 'Doe',
      total: 25, //get from cartstate,
      streetAddress: '77 Winchester Lane',
      aptNum: '1A',
      city: 'Coachella',
      state: 'CA',
      zipcode: 92236
    }
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    console.log(ev.target)

    // SUBMIT TO THUNK
    let objToSubmit = {
      total: this.state.total,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      userId: this.props.user.id, // set this in checkoutForm
      cart: this.props.cart
    }

    console.log('WILL SUBMIT THIS TO THUNK...', objToSubmit)

    this.props.postCart(objToSubmit)

    console.log('pls run')
    // STRIPE
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
    const {cart} = this.props
    // console.log('CART!!!', cart)
    console.log('user???', this.props)

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

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  postCart: cartInfo => dispatch(postCart(cartInfo))
})

const connectedCheckoutForm = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutForm
)

export default injectStripe(connectedCheckoutForm)

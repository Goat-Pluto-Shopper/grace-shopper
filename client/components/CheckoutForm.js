import {connect} from 'react-redux'
import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {postCart} from '../store/cart'

const totalPrice = cart =>
  cart.reduce((total, items) => items.price * items.cartQuantity + total, 0)
class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      firstName: '',
      lastName: '',
      email: '',
      total: totalPrice(this.props.cart),
      streetAddress: '',
      aptNum: '',
      city: '',
      state: '',
      zipcode: ''
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    console.log(ev.target)

    // SUBMIT TO THUNK
    let objToSubmit = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      total: this.state.total,
      streetAddress: this.state.streetAddress,
      aptNum: this.state.aptNum,
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

  handleChange(changeEvt) {
    this.setState({[changeEvt.target.name]: changeEvt.target.value})
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
            id="firstName"
            name="firstName"
            placeholder="Jane"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            id="email"
            name="email"
            placeholder="email@email.com"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>Street Address</span>
          <input
            id="streetAddress"
            name="streetAddress"
            placeholder="77 Winchester Lane"
            value={this.state.streetAddress}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>Apt Number</span>
          <input
            id="aptNum"
            name="aptNum"
            placeholder="1A"
            value={this.state.aptNum}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>City</span>
          <input
            id="city"
            name="city"
            placeholder="Coachella"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>State</span>
          <input
            id="state"
            name="state"
            placeholder="CA"
            value={this.state.state}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>ZIP</span>
          <input
            id="zipcode"
            name="zipcode"
            placeholder="92236"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">COMPLETE CHECKOUT</button>
        <div className="outcome">
          <div className="error" />
          <div className="success">
            Success! Your Stripe token is <span className="token" />
          </div>
        </div>
      </form>
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

import {connect} from 'react-redux'
import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {postCart} from '../store/cart'
// material ui
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

// helper function to calculate price
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
        <Typography variant="h6" gutterBottom>
          Billing address
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              placeholder="Jane"
              value={this.state.firstName}
              onChange={this.handleChange}
              label="First name"
              fullWidth
              autoComplete="fname"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={this.state.lastName}
              onChange={this.handleChange}
              label="Last name"
              fullWidth
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              placeholder="email@email.com"
              value={this.state.email}
              onChange={this.handleChange}
              label="Email"
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="streetAddress"
              name="streetAddress"
              placeholder="77 Winchester Lane"
              value={this.state.streetAddress}
              onChange={this.handleChange}
              label="Street Address"
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="aptNum"
              name="aptNum"
              label="Apt Number"
              placeholder="1A"
              value={this.state.aptNum}
              onChange={this.handleChange}
              fullWidth
              autoComplete="billing address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              placeholder="Coachella"
              value={this.state.city}
              onChange={this.handleChange}
              fullWidth
              autoComplete="billing address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="state"
              name="state"
              placeholder="CA"
              value={this.state.state}
              onChange={this.handleChange}
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="zipcode"
              name="zipcode"
              placeholder="92236"
              value={this.state.zipcode}
              onChange={this.handleChange}
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Credit or Debit Card
        </Typography>
        <Grid container spacing={24}>
          <input type="hidden" name="token" />

          <Grid item xs={12}>
            <CardElement onReady={el => el.focus()} />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary">
          COMPLETE CHECKOUT
        </Button>

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

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'

class AddToCart extends Component {
  render() {
    return (
      <button
        type="button"
        name="addToCart"
        onClick={() => this.props.addToCart(this.props.item)}
      >
        Add To Cart
      </button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item))
})

const ConnctedAddToCart = connect(null, mapDispatchToProps)(AddToCart)

export default ConnctedAddToCart

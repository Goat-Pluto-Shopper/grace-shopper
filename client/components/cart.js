import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {incrementQuantity, decrementQuantity} from '../store/'
import CartItem from './CartItem'

const totalPrice = cart =>
  cart.reduce((total, items) => items.price * items.cartQuantity + total, 0)

class Cart extends Component {
  render() {
    const {cart} = this.props

    return (
      <div id="cartContainer">
        <h1>Shopping Cart</h1>
        <hr />
        <div id="cart">
          {/* FOR EACH ITEM */}
          <div className="cartLeft">
            {cart.map(item => {
              return (
                <CartItem
                  item={item}
                  key={item.id}
                  incrementQuantity={this.props.incrementQuantity}
                  decrementQuantity={this.props.decrementQuantity}
                />
              )
            })}
          </div>
          {/* end cartLeft div */}
          <div className="cartRight">
            <div className="totalPrice">
              <h2>TOTAL</h2>
              <h2>${(totalPrice(cart) / 100).toFixed(2)}</h2>
            </div>
            <Link to="/checkout">
              <button type="checkout" className="checkout">
                <h2>CHECKOUT</h2>
              </button>
            </Link>
          </div>
          {/* end cartRight div */}
        </div>
        {/* end cart div */}
      </div> // end entire component div
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  incrementQuantity: item => dispatch(incrementQuantity(item)),
  decrementQuantity: item => dispatch(decrementQuantity(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

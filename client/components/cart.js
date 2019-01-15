import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {incrementQuantity, decrementQuantity} from '../store/'

const totalPrice = cart =>
  cart.reduce((total, items) => items.price * items.cartQuantity + total, 0)

class Cart extends Component {
  componentDidMount() {
    // console.log('are there props on cart', this.props)
  }

  render() {
    const {cart} = this.props
    console.log('props passed to Cart.js', this.props)
    console.log('cart', cart)

    return (
      <div id="cartContainer">
        <h1>Shopping Cart</h1>
        <hr />
        <div id="cart">
          {/* FOR EACH ITEM */}
          <div className="cartLeft">
            {cart.map(item => {
              return (
                <div key={item.id} className="cartItem">
                  <div className="cartItemLeft">
                    <img src={item.imageUrl} />
                  </div>
                  {/* end cartItemLeft div */}

                  <div className="cartItemRight">
                    <h2>{item.name}</h2>
                    <p>${(item.price / 100).toFixed(2)}</p>
                    <div className="quantityBlock">
                      <button
                        type="button"
                        name="increment"
                        onClick={() => this.props.decrementQuantity(item)}
                      >
                        -
                      </button>
                      <p>{item.cartQuantity}</p>
                      <button
                        type="button"
                        name="decrement"
                        onClick={() => this.props.incrementQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                    {/* end quantityBlock div */}
                  </div>
                  {/* end cartItemRight div */}
                </div> //* end cartItem div
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

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  incrementQuantity: item => dispatch(incrementQuantity(item)),
  decrementQuantity: item => dispatch(decrementQuantity(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// export default Cart

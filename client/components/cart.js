import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {incrementQuantity, decrementQuantity} from '../store/'
import Button from '@material-ui/core/Button'

// const fakeItems = [
//   {
//     id: 1,
//     imageUrl: 'https://place-hold.it/300',
//     name: 'Uno',
//     price: 10.28
//   },
//   {
//     id: 2,
//     imageUrl: 'https://place-hold.it/300',
//     name: 'Avalon',
//     price: 19.99
//   },
//   {
//     id: 3,
//     imageUrl: 'https://place-hold.it/300',
//     name: 'Risk',
//     price: 19.97
//   }
// ]

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
      <div>
        <h1>Shopping Cart</h1>
        {/* FOR EACH ITEM */}
        <div className="cartLeft">
          {cart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.imageUrl} />
                <p>{item.name}</p>
                <p>${item.price}</p>
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
              </div>
            )
          })}
        </div>

        <div className="cartRight">
          <div className="totalPrice">TOTAL: ${totalPrice(cart)}</div>
          <Link to="/checkout">
            <Button variant="contained" color="primary" type="checkout">
              CHECKOUT
            </Button>
          </Link>
        </div>
      </div>
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

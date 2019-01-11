import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
// import {fetchCart, getCartItems} from '../store/cart'
import {loadState, saveState} from '../store/localStorage'
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

class Cart extends Component {
  componentDidMount() {
    // this.props.fetchCart()
    // this.props.getCartItems()
    // console.log('are there props on cart', this.props)
  }

  render() {
    const {cart} = this.props
    console.log('props passed to cart', this.props)
    console.log('!!!!!', cart)
    console.log('localStorage state', JSON.parse(localStorage.getItem('state')))

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
                  <button type="subtract">-</button>
                  <p>{item.cartQuantity}</p>
                  <button type="add">+</button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="cartRight">
          total
          <Button variant="contained" color="primary" type="checkout">
            CHECKOUT
          </Button>
          {/* <button type="checkout">CHECKOUT</button> */}
        </div>
      </div>
    )
  }
}
//cart will render items added by user =. will display price and quantity
//should display total price
//should display shipping price
// cart should render a checkout button handled by STRIPE

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

const mapStateToProps = state => ({
  cart: state.cart
})

// const mapDispatchToProps = dispatch => ({
//   getCartItems: items => dispatch(getCartItems(items))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Cart)

export default connect(mapStateToProps)(Cart)

// export default Cart

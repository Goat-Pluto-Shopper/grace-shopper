import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {fetchCart} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
    console.log('are there props on cart', this.props)
  }

  render() {
    console.log('props passed to cart', this.props)

    return (
      <div>
        <h1>Shopping Cart</h1>
        {/* FOR EACH ITEM */}
        <div>
          <ul>
            <div id="itemThumbnail" />
            Product Name Price
            <button type="subtract">-</button>
            <button type="add">+</button>
          </ul>
        </div>
        <div className="cartRight">
          total
          <button type="checkout">CHECKOUT</button>
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

const mapStateToProps = ({items}) => ({items})
const mapDispatchToProps = {fetchCart}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

import React from 'react'
import CartQuantity from './CartQuantity'

const CartItem = props => {
  const {item, incrementQuantity, decrementQuantity} = props

  return (
    <div key={item.id} className="cartItem">
      <div className="cartItemLeft">
        <img src={item.imageUrl} />
      </div>
      {/* end cartItemLeft div */}

      <div className="cartItemRight">
        <h2>{item.name}</h2>
        <p>${(item.price / 100).toFixed(2)}</p>
        <CartQuantity
          item={item}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      </div>
      {/* end cartItemRight div */}
    </div> //* end cartItem div
  )
}
export default CartItem

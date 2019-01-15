import React from 'react'

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
        <div className="quantityBlock">
          <button
            type="button"
            name="increment"
            onClick={() => decrementQuantity(item)}
          >
            -
          </button>
          <p>{item.cartQuantity}</p>
          <button
            type="button"
            name="decrement"
            onClick={() => incrementQuantity(item)}
          >
            +
          </button>
        </div>
        {/* end quantityBlock div */}
      </div>
      {/* end cartItemRight div */}
    </div> //* end cartItem div
  )
}
export default CartItem

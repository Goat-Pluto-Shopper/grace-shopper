import React from 'react'

const CartQuantity = props => {
  const {item, incrementQuantity, decrementQuantity} = props

  return (
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
  )
}

export default CartQuantity

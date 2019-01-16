import axios from 'axios'

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY'
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY'
export const SUBMIT_CART_TO_SERVER = 'SUBMIT_CART_TO_SERVER'

// ACTION CREATORS
export const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

export const removeCartItem = item => ({
  type: REMOVE_FROM_CART,
  item
})

export const incrementQuantity = item => ({
  type: INCREMENT_QUANTITY,
  item
})

export const decrementQuantity = item => ({
  type: DECREMENT_QUANTITY,
  item
})

export const submitCart = cart => ({
  type: SUBMIT_CART_TO_SERVER,
  cart
})

// THUNK CREATORS

//this goes in checkoutForm.js
export const postCart = cartInfo => async dispatch => {
  try {
    const res = await axios.post('/api/orders', {
      firstName: cartInfo.firstName,
      lastName: cartInfo.lastName,
      email: cartInfo.email,
      total: cartInfo.total,
      streetAddress: cartInfo.streetAddress,
      city: cartInfo.city,
      state: cartInfo.state,
      zipcode: cartInfo.zipcode,
      userId: cartInfo.userId, // set this in checkoutForm
      cart: cartInfo.cart // an array
    })
    dispatch(submitCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER HELPER FUNCTIONS

// helper function to test if cart includes item by id
const itemAlreadyInCart = (cart, id) => {
  let result = false
  cart.forEach(item => {
    if (item.id === id) result = true
  })
  return result
}

// helper function to get index of item in cart by id
const getItemIndex = (cart, id) => {
  let idx
  cart.forEach((item, index) => {
    if (item.id === id) idx = index
  })
  return idx
}

// REDUCER
export default function cartReducer(cart = [], action) {
  const cartCopy = [...cart]
  switch (action.type) {
    case SUBMIT_CART_TO_SERVER:
      return []
    case ADD_TO_CART:
      //if item is already in the cart, increase cartQuantity on that item without re-adding the item
      if (itemAlreadyInCart(cart, action.item.id)) {
        let idx = getItemIndex(cartCopy, action.item.id)
        cartCopy[idx].cartQuantity++
        return cartCopy
      } else {
        //if item is not in the cart, add a cartQuantity property to the item and set it to 1
        action.item.cartQuantity = 1
        return [...cart, action.item]
      }
    case INCREMENT_QUANTITY:
      let idx = getItemIndex(cartCopy, action.item.id)
      cartCopy[idx].cartQuantity++
      return cartCopy
    case DECREMENT_QUANTITY:
      let i = getItemIndex(cartCopy, action.item.id)
      if (cartCopy[i].cartQuantity !== 0) cartCopy[i].cartQuantity--
      return cartCopy
    default:
      return cart
  }
}

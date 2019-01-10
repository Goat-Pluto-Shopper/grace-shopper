import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

//initial state
// {
//   cart: []
// }

//action creators
export const getCartItems = items => ({
  type: GET_CART_ITEMS,
  payload: items
})

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item
})

const removeCartItem = item => ({
  type: REMOVE_FROM_CART,
  payload: item
})

const updateItemQuantity = item => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: item
})

//get this from local storage!!
export const fetchCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get('/api/cart')
    dispatch(getCartItems(cart))
  } catch (err) {
    console.error(err)
  }
}

//add to local storage!!
export const addCartItem = item => async dispatch => {
  try {
    const {data: addedItem} = await axios.post(`api/items`, item)
    dispatch(addToCart(addedItem))
  } catch (err) {
    console.error(err)
  }
}

// export const deleteCartItem = item => async dispatch => {
//   try {
//     const {data: deletedItem} = await axios.delete(`/api/cart/${item.id}`, item)
//     dispatch(removeCartItem(deletedItem))
//   } catch (err) {
//     next(err)
//   }
// }

//NOT SURE ABOUT THIS ONE
export const updateCart = item => async dispatch => {
  try {
    const {data: updatedCart} = await axios.put(
      `/api/cart/${item.id}/${req.query}`,
      item
    ) //????? update num
    dispatch(updateItemQuantity(updatedCart))
  } catch (err) {
    next(err)
  }
}

//Reducer
export default function cartReducer(cart = [], action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return [action.payload]
    case ADD_TO_CART:
      return [...cart, action.payload]
    case REMOVE_FROM_CART:
      return [...cart.filter(item => item.id !== action.payload)]
    //NOT SURE ABOUT THIS ONE
    // case UPDATE_ITEM_QUANTITY:
    //   return cart.map(item => {
    //     if (item !== item.payload) {
    //       return cart
    //     }
    //     return [...cart]
    //   })
    default:
      return cart
  }
}

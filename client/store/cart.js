import axios from 'axios'

export const GET_CART_ITEMS = 'GET_CART_ITEMS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

//initial state
// {
//   cart: []
// }

//action creators
// export const getCartItems = items => ({
//   type: GET_CART_ITEMS,
//   payload: items
// })

export const addToCart = item => {
  return {
    type: ADD_TO_CART,
    item
  }
}

export const removeCartItem = item => ({
  type: REMOVE_FROM_CART,
  payload: item
})

export const updateItemQuantity = item => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: item
})

//get this from local storage!!
// export const fetchCart = () => async dispatch => {
//   try {
//     const {data: cart} = await axios.get('/api/cart')
//     dispatch(getCartItems(cart))
//   } catch (err) {
//     console.error(err)
//   }
// }

//add to local storage!!
// export const addCartItem = item => async dispatch => {
//   try {
//     const {data: addedItem} = await axios.post(`api/items`, item)
//     dispatch(addToCart(addedItem))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const deleteCartItem = item => async dispatch => {
//   try {
//     const {data: deletedItem} = await axios.delete(`/api/cart/${item.id}`, item)
//     dispatch(removeCartItem(deletedItem))
//   } catch (err) {
//     next(err)
//   }
// }

//NOT SURE ABOUT THIS ONE
// export const updateCart = item => async dispatch => {
//   try {
//     const {data: updatedCart} = await axios.put(
//       `/api/cart/${item.id}/${req.query}`,
//       item
//     ) //????? update num
//     dispatch(updateItemQuantity(updatedCart))
//   } catch (err) {
//     next(err)
//   }
// }

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

//Reducer
export default function cartReducer(cart = [], action) {
  switch (action.type) {
    // case GET_CART_ITEMS:
    //   return [action.payload]
    case ADD_TO_CART:
      //if item is already in the cart, increase cartQuantity on that item without re-adding the item
      if (itemAlreadyInCart(cart, action.item.id)) {
        const cartCopy = [...cart]
        let idx = getItemIndex(cartCopy, action.item.id)
        cartCopy[idx].cartQuantity++
        return cartCopy
      } else {
        //if item is not in the cart, add a cartQuantity property to the item and set it to 1
        action.item.cartQuantity = 1
        return [...cart, action.item]
      }
    // case REMOVE_FROM_CART:
    //   return [...cart.filter(item => item.id !== action.payload)]
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

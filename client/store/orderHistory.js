import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_ITEMS = 'GET_ITEMS'

/**
 * INITIAL STATE
 */
const defaultOrderHisory = {orders: [], recentItems: []}

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
const getItems = items => ({type: GET_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const getPastItems = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}`)
    dispatch(getItems(res.data || defaultOrderHisory.items))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrderHisory, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {...state, recentItems: action.items}
    default:
      return state
  }
}

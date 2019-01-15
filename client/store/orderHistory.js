import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_RECENT_ITEMS = 'GOT_RECENT_ITEMS'

/**
 * INITIAL STATE
 */
const defaultOrderHisory = {recentItems: []}

/**
 * ACTION CREATORS
 */
const getRecentItems = items => ({type: GOT_RECENT_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const getOrderHistory = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/`)
    dispatch(getRecentItems(res.data || defaultOrderHisory.recentItems))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrderHisory, action) {
  switch (action.type) {
    case GOT_RECENT_ITEMS:
      return {...state, recentItems: action.items}
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const GET_SINGLE_ITEM = 'GET_SINGLE_ITEM'

/**
 * INITIAL STATE
 */
const itemState = {
  allItems: [],
  selectedItem: {}
}

/**
 * ACTION CREATORS
 */
export const getAllItems = items => ({
  type: GET_ALL_ITEMS,
  items
})

const getSingleItem = item => ({
  type: GET_SINGLE_ITEM,
  item
})

/**
 * THUNK CREATORS
 */

export const fetchAllItems = () => async dispatch => {
  try {
    const res = await axios.get('/api/games')
    dispatch(getAllItems(res.data || itemState.allItems))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleItem = id => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${id}`)
    dispatch(getSingleItem(res.data || itemState.selectedItem))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = itemState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {...state, allItems: action.items}
    case GET_SINGLE_ITEM:
      return {...state, selectedItem: action.item}
    default:
      return state
  }
}
